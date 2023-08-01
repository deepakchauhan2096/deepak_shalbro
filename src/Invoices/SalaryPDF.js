import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import moment from "moment/moment";

const SalaryPDF = (props) => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "white",
    },
    section: {
      margin: 10,
      padding: "20px",
      flexGrow: 1,
    },
    text: {
      fontSize: "12px",
      fontWeight: "200",
    },
  });

  const Table = StyleSheet.create({
    tableContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 24,
      borderWidth: 1,
      borderColor: '#f9f9f9',
      // marginLeft:"20px",
      // marginRight:"20px"
    },
  });

  // Table Header
  const TableHeader = () => {

    const borderColor = '#f9f9f9'

    const styles = StyleSheet.create({
      container: {
        flexDirection: 'row',
        borderBottomColor: '#f9f9f9',
        backgroundColor: '#f9f9f9',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
      },
      description: {
        width: '20%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        fontSize:"12px"
      },
      qty: {
        width: '20%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        fontSize:"12px"
      },
      rate: {
        width: '20%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        fontSize:"12px"
      },
      amount: {
        width: '20%',
        fontSize:"12px"
      },
      status: {
        width: '20%',
        fontSize:"12px"
      },
    });

    return (
      <View style={styles.container}>
        <Text style={styles.description}>Date</Text>
        <Text style={styles.qty}>In</Text>
        <Text style={styles.rate}>Out</Text>
        <Text style={styles.amount}>Working hours</Text>
        <Text style={styles.status}>Status</Text>
      </View>
    )
  }

  //Table row 

  const TableRow = ({ items }) => {

    const borderColor = '#f9f9f9'
    const styles = StyleSheet.create({
      row: {
        flexDirection: 'row',
        borderBottomColor: '#f9f9f9',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 20,
        fontStyle: 'bold',
        fontSize:"12px"
      },
      description: {
        width: '20%',
        textAlign: 'center',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        fontSize:"12px"
      },
      qty: {
        width: '20%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
        fontSize:"12px"
      },
      rate: {
        width: '20%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
        fontSize:"12px"
      },
      amount: {
        width: '20%',
        textAlign: 'center',
        fontSize:"12px"
      },
      status: {
        width: '20%',
        textAlign: 'center',
        fontSize:"12px"
      },
    });

     // time calculation

  const timeValueHours = (x, y) => {
    return Math.abs(new Date(x).getUTCHours() - new Date(y).getUTCHours());
  };

  const timeValueMinutes = (x, y) => {
    return Math.abs(new Date(x).getUTCMinutes() - new Date(y).getUTCMinutes());
  };

    const rows = items.map(item =>
      <View style={styles.row} >
        <Text style={styles.description}>{item.ATTENDANCE_DATE_ID}</Text>
        <Text style={styles.qty}>{moment(item.ATTENDANCE_IN).format("LT")}</Text>
        <Text style={styles.rate}>{moment(item.ATTENDANCE_OUT).format("LT")}</Text>
        <Text style={styles.amount}>
        {timeValueHours(item.ATTENDANCE_OUT, item.ATTENDANCE_IN)}{" "}
                  hours{" "}
                  {timeValueMinutes(item.ATTENDANCE_OUT, item.ATTENDANCE_IN)}{" "}
                  mins
        </Text>
        <Text style={styles.status}>
        {item.ATTENDANCE_IN && item.ATTENDANCE_OUT
                    ? "present"
                    : "absent"}
        </Text>
      </View>
    )

    return (
      <>{rows}</>
    )
  }


  //Table Bottm

  const TableBottom = () => {

    const borderColor = '#f9f9f9'
    const styles = StyleSheet.create({
      row: {
        flexDirection: 'row',
        borderBottomColor: '#f9f9f9',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 20,
        fontStyle: 'bold',
        fontSize:"12px"
      },
      description: {
        width: '20%',
        textAlign: 'center',
        // borderRightColor: borderColor,
        // borderRightWidth: 1,
        fontSize:"12px"
      },
      qty: {
        width: '20%',
        // borderRightColor: borderColor,
        // borderRightWidth: 1,
        textAlign: 'center',
        fontSize:"12px"
      },
      rate: {
        width: '20%',
        // borderRightColor: borderColor,
        // borderRightWidth: 1,
        textAlign: 'center',
        fontSize:"12px"
      },
      amount: {
        width: '20%',
        textAlign: 'center',
        fontSize:"12px"
      },
      status: {
        width: '20%',
        textAlign: 'center',
        fontSize:"12px"
      },
       });




    const rows = 
      <View style={styles.row} >
        <Text style={styles.description}>{"Total Hours -"}</Text>
        <Text style={styles.qty}>{props.workingHours}</Text>
        <Text style={styles.rate}>{""}</Text>
        <Text style={styles.amount}>{"Total Income -"}</Text>
        <Text style={styles.status}>$ {props.totalIncome}/-</Text>
      </View>
    

    return (
      <>{rows}</>
    )
  }

  //Table Column 

  const TableCol = ({ rowsCount }) => {

    const borderColor = '#f9f9f9'
    const styles = StyleSheet.create({
      row: {
        flexDirection: 'row',
        borderBottomColor: '#f9f9f9',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
        color: 'white'
      },
      description: {
        width: '60%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
      },
      qty: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
      },
      rate: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
      },
      amount: {
        width: '15%',
      },

    });

    const blankRows = Array(rowsCount).fill(0)
    const rows = blankRows.map((x, i) =>
      <View style={styles.row}>
        <Text style={styles.description}>-</Text>
        <Text style={styles.qty}>-</Text>
        <Text style={styles.rate}>-</Text>
        <Text style={styles.amount}>-</Text>
      </View>
    )
    return (<>{rows}</>)
  }



  const date = new Date()
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  return (
    <Document>
      {/** Page defines a single page of content. */}

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.text}>Name: <Text style={{textDecoration:"underline"}}>{props.name}</Text></Text>
          <Text style={styles.text}>Address: {props.address}</Text>
          <Text style={styles.text}>Email: {props.email}</Text>
          <Text style={styles.text}>Phone No: {props.phone}</Text>
          <Text style={styles.text}>Salary Date {day}-{month}-{year}</Text>
          

          <View style={Table.tableContainer}>
          <TableHeader />
          <TableRow items={props.mapvalue} />
          <TableBottom />
        </View>
        </View>
      </Page>
    </Document>
  );
};
export default SalaryPDF;
