import { createMuiTheme } from '@material-ui/core/styles';

import deepOrange from "@material-ui/core/colors/deepOrange";
import amber from "@material-ui/core/colors/amber";
import grey from "@material-ui/core/colors/grey";

// Helpful links
// https://coolors.co/
// https://material-ui.com/customization/palette/

// export interface Theme {
//     shape: Shape;
//     breakpoints: Breakpoints;
//     direction: Direction;
//     mixins: Mixins;
//     overrides?: Overrides;
//     palette: Palette;
//     props?: ComponentsProps;
//     shadows: Shadows;
//     spacing: Spacing;
//     transitions: Transitions;
//     typography: Typography;
//     zIndex: ZIndex;
//     unstable_strictMode?: boolean;
//   }


// export interface Palette {
//     common: CommonColors;
//     type: PaletteType;
//     contrastThreshold: number;
//     tonalOffset: PaletteTonalOffset;
//     primary: PaletteColor;
//     secondary: PaletteColor;
//     error: PaletteColor;
//     warning: PaletteColor;
//     info: PaletteColor;
//     success: PaletteColor;
//     grey: Color;
//     text: TypeText;
//     divider: TypeDivider;
//     action: TypeAction;
//     background: TypeBackground;
//     getContrastText: (background: string) => string;
//     augmentColor: {
//       (
//         color: ColorPartial,
//         mainShade?: number | string,
//         lightShade?: number | string,
//         darkShade?: number | string
//       ): PaletteColor;
//       (color: PaletteColorOptions): PaletteColor;
//     };
//   }


// export interface PaletteColor {
//     light: string;
//     main: string;
//     dark: string;
//     contrastText: string;
//   }

const theme = createMuiTheme({
    palette: {
        primary: {
            main: deepOrange[500],
        },
        secondary: {
            main: amber[800],
        },
        background: {
            default: grey[100],
        }
        // --midnight-green-eagle-green: #0f4c5cff;
        // --cg-blue: #0081afff;
    },
})

export default theme;