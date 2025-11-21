"use client"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import * as React from "react"

interface AutocompleteOption {
  value: number | string
  label: string
}

interface AutocompleteInputProps {
  options: AutocompleteOption[]
  value: string
  onValueChange: (value: string) => void
  onSelect?: (option: AutocompleteOption | null) => void
  placeholder?: string
  className?: string
}

export function AutocompleteInput({
  options,
  value,
  onValueChange,
  onSelect,
  placeholder = "Type to search...",
  className,
}: AutocompleteInputProps) {
  const [open, setOpen] = React.useState(false)
  const [filteredOptions, setFilteredOptions] = React.useState<AutocompleteOption[]>(options)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!value) {
      setFilteredOptions(options)
    } else {
      const filtered = options.filter((option) => option.label.toLowerCase().includes(value.toLowerCase()))
      setFilteredOptions(filtered)
    }
  }, [value, options])

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    onValueChange(newValue)
    setOpen(true)
    // Clear selection when typing (indicates custom input)
    if (onSelect) {
      onSelect(null)
    }
  }

  const handleSelect = (option: AutocompleteOption) => {
    onValueChange(option.label)
    if (onSelect) {
      onSelect(option)
    }
    setOpen(false)
    inputRef.current?.blur()
  }

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onFocus={() => setOpen(true)}
        className={className}
      />

      {open && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 max-h-60 overflow-auto rounded-md border bg-popover shadow-md"
        >
          {filteredOptions.length > 0 ? (
            <div className="p-1">
              {filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={cn(
                    "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                    value === option.label && "bg-accent",
                  )}
                  onClick={() => handleSelect(option)}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === option.label ? "opacity-100" : "opacity-0")} />
                  {option.label}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-sm text-muted-foreground text-center">
              No results found. Press Enter to use custom name.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
