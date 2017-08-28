/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}
declare function $(arr: string): JQurey;
interface JQurey {

  length: number

}

declare let Materialize:{
  toast(text,time): any;
  updateTextFields(): any;
}


