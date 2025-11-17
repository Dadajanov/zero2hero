import { common } from './common'
import { registration } from './registration'
import { login } from './login'
import { home } from './home'
import { profile } from './profile'
import { jobSeekers } from './job-seekers'
import { employers } from './employers'
import { universities } from './universities'
import { about } from './about'
import { errors } from './errors'

export const en = {
  ...common,
  ...registration,
  ...login,
  ...home,
  ...profile,
  ...jobSeekers,
  ...employers,
  ...universities,
  ...about,
  ...errors,
} as const
