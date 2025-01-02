declare module '*.module.css' {
    interface IClassName {
        [className: string]: string;
    }

    const styles: IClassName;
    export = styles;
}

declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';

declare module '*.svg' {
    import React from 'react';
    const Svg: React.FC<React.SVGProps<SVGSVGElement>>;
    export default Svg;
}

declare const __API__: string;