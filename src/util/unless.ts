import { RequestHandler, Request, Response, NextFunction } from 'express'
import { pathToRegexp, Path } from 'path-to-regexp'
const unless = (paths: Path, middleware: RequestHandler): RequestHandler => {
  const regex = pathToRegexp(paths)
  return (req: Request, res: Response, next: NextFunction) =>
    regex.test(req.url) ? next() : middleware(req, res, next)
}
export default unless
