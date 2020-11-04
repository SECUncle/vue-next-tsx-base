import Input from './src'

Input.install = (app: any) => {
  app.component(Input.name, Input)
}
export default Input
