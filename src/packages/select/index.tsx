import Select from './src/select'

Select.install = function (app: any) {
  app.component(Select.name, Select)
}
export default Select
