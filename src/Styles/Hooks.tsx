import { makeStyles } from "@material-ui/core";
import { DARK_INFO, DARK_PRIMARY, LIGHT, LIGHT_INFO, LIGHT_PRIMARY, Theme } from "./Colors";

interface Props {
    theme: Theme
}

const baseBottomBar = {
    maxWidth: "400px",
    height: "96px",
    bottom: "0px"
}

const baseFab = {}

export const useStyles = makeStyles({
    bottomBar: ({ theme }: Props) => theme === LIGHT ?
        {
            ...baseBottomBar,
            position: "fixed",
            color: LIGHT_PRIMARY,
        } : {
            ...baseBottomBar,
            position: "fixed",
            color: DARK_PRIMARY,
        },
    fab: ({ theme }: Props) => theme === LIGHT ?
        {
            ...baseFab,
            color: LIGHT_PRIMARY,
            backgroundColor: LIGHT_INFO,
        } : {
            ...baseFab,
            color: DARK_PRIMARY,
            backgroundColor: DARK_INFO,
        },
})
