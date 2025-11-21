import { useTranslation } from "react-i18next"

type WelcomeVideoProps = {
  videoUrl: string
}

export const WelcomeVideo = (props: WelcomeVideoProps) => {
  const { t } = useTranslation(['registration'])
  const { videoUrl } = props
  return <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-800">{t("greeting")}</h2>
    <p className="text-gray-600">{t("greetingText")}</p>
    <div className="rounded-lg overflow-hidden bg-black">
      <video className="w-full h-auto" controls poster="/images/video-poster.jpg">
        <source src={videoUrl} type="video/mp4" />
        <p className="text-white p-4">Your browser does not support the video tag.</p>
      </video>
    </div>
  </div>
}
