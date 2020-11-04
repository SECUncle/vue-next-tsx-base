import Tag from './src'

Tag.install = (app: any) => {
  app.component(Tag.name, Tag)
}
export default Tag
