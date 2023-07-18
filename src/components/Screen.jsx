import React, {useState} from "react";
import Box from "@mui/material/Box";
import { Button, Container, Paper } from "@mui/material";
import { styled } from '@mui/material/styles';


const Screen = () => {


const [btn , setBtn ] = useState("")
const [value , setValue ] = useState(0)


const btns = [
    {
        btnName:"attendance",
        btnLink:"link",
        btnFun: ""
    },
    {
        btnName:"2",
        btnLink:"link",
        btnFun: ""
    }
]

const handleClick = (event) => {
    setValue(event)
}


const screens = [1,2,3]


// const MyScreen = (props) => {

//     const data = props.screen
//     return data ? (<><div style={{}}>{'h' + props.title}</div></>) :""
// }

const MyScreen = styled(Paper)(({props}) => (
  {
  height:"calc(100vh - 37px)",
  padding: 20, 
  paddingBottom: "0",
  background:"pink" 
 }
));


 return (
    <>
      <Container
        id="content"
        sx={{ height: "100vh", position: "relative" }}
        maxWidth="xl"
        className="containers"
      >
        <Box className="box">
          <div className="container-fluid d-flex pb-0 g-0 flex-column">
            <div style={{ height: "20%" }}>
              {btns.map((items,index)=>(<Button className="btn button btn-blue" variant="contained" onClick={(e) => handleClick(index)}>
                {items.btnName}
              </Button>))}
            </div>

            <MyScreen screen={0}>
                
                     hi3
            </MyScreen>
            <MyScreen screen={1}>
                
                     hi3
            </MyScreen>
          </div>
        </Box>
      </Container>
    </>
  );
};

export default Screen;
