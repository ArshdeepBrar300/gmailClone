import { Box, Button, styled, List, ListItem } from "@mui/material"
import { CreateOutlined } from "@mui/icons-material"
import { SIDEBAR_DATA } from "../config/sidebar.config"
import ComposeMail from "./ComposeMail"
import { useState } from "react"
import { routes } from "../routes/routes"
import { NavLink, useParams } from "react-router-dom"
const ComposeButton = styled(Button)({
    background: '#C2E7FF',
    color: '#001d35',
    padding: '15px',
    marginLeft: 8,
    borderRadius: 16,
    minwidth: '140px',
    textTransform: 'none',
    '& > svg': {
        marginRight: '6px'
    }

})

const Container = styled(Box)({
    padding: '8px 8px 8px 0',
    width: '92%',
    '& > ul': {
        padding: '10px 0 0 0',
        fontSize: '14px',

        fontWeight: 500,
        cursor: 'pointer',
        '& >a': {
            textDecoration: 'none',
            color: 'inherit'
        }
    },
    '& > ul > a>li >svg': {
        marginRight: 20
    }
})


const SideBarContent = () => {

    const [openDialog, setOpenDialog] = useState(false)
    const { type } = useParams()
    const onComposeClick = () => {
        setOpenDialog(true);
    }


    return (
        <Container >

            <ComposeButton onClick={onComposeClick}>
                <CreateOutlined />
                Compose</ComposeButton>

            <List>
                {
                    SIDEBAR_DATA.map(data => (
                        <NavLink key={data.name} to={`${routes.emails.path}/${data.name}`}>
                            <ListItem key={data.name} style={type == data.title.toLowerCase() ? { backgroundColor: '#d3e3fd', borderRadius: '0 16px 16px 0' } : {}}>
                                <data.icon fontSize="small" />
                                {data.title}
                            </ListItem>

                        </NavLink>

                    ))
                }
            </List>
            <ComposeMail openDialog={openDialog} setOpenDialog={setOpenDialog} />
        </Container>
    )
}
export default SideBarContent