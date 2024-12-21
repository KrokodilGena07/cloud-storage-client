declare module '*.module.css' {
    interface IClassName {
        [className: string]: string;
    }

    const styles: IClassName;
    export = styles;
}