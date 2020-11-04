import Popper from './src'

Popper.install = function (app: any) {
  app.component(Popper.name, Popper)
}
export default Popper
