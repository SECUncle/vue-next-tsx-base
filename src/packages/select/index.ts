import Select from './src/select'

Select.install = (app: any) => {
  app.component(Select.name, Select)
}
export default Select
