import jwt from 'jsonwebtoken'

export const isAdmin = () => {
  const token = JSON.parse(localStorage.getItem('token') || 'null')

  const decoded: any = jwt.decode(token)

  return decoded?.isAdmin ? decoded.isAdmin : false
}
