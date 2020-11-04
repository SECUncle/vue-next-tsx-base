import Tag from './src'

Tag.install = function (app: any) {
  app.component(Tag.name, Tag)
}
export default Tag
