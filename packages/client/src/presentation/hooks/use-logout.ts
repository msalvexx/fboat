import { currentAccountState } from '@/client/presentation/components'
import { useNavigate } from 'react-router-dom'

import { useRecoilValue } from 'recoil'

type ResultType = () => void

export const useLogout = (): ResultType => {
  const navigate = useNavigate()
  const { setCurrentAccountCredentials } = useRecoilValue(currentAccountState)
  return (): void => {
    setCurrentAccountCredentials(undefined)
    navigate('/login')
  }
}
