import Popper from './src'

Popper.install = (app: any) => {
  app.component(Popper.name, Popper)
}
export default Popper
