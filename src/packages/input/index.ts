import Input from './src'

Input.install = function (app: any) {
  app.component(Input.name, Input)
}
export default Input