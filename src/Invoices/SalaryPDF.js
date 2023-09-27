import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';





// Create a PDF component
const SalaryPDF = (props) => {

  const styles = StyleSheet.create({
    page: {
      padding: 80,
      marginTop:50
    },
    header: {
      fontSize: 12,
      fontWeight: 'bold',
      marginTop: 10,
      textAlign: "center",
      fontFamily:"Times-Roman"
    },
    date: {
      fontSize: 12,
      textAlign: "left",
      fontFamily:"Times-Roman"
    },
    para: {
      fontSize: 12,
      textAlign: "center",
      marginTop: 5,
      fontFamily:"Times-Roman"
    },
    sign: {
      marginTop: 20,
      fontSize: 12,
      textAlign: "right",
      fontFamily:"Times-Roman"
    },
    rightAlignedText: {
      flexDirection: 'row',
      justifyContent: "flex-end",
      alignItems: 'center',
      marginTop: 20,
      fontFamily:"Times-Roman"
    },
    label: {
      fontSize: 12,
      marginRight: 0,
      fontFamily:"Times-Roman"
    },
    week: {
      fontSize: 12,
      marginTop: 20,
      fontFamily:"Times-Roman"
    },
    value: {
      fontSize: 12,
      textDecoration: "underline",
      fontFamily:"Times-Roman"
    },

  });


  return (
    <Document>
      <Page style={styles.page}>
        {/* Date */}
        <Text style={styles.date}>Date: {props.date}</Text>

        {/* Acknowledgment of Hours Worked */}
        <Text style={styles.header}>ACKNOWLEDGMENT OF HOURS WORKED</Text>

        {/* Review hours */}
        <Text style={styles.para}>
          I have carefully reviewed the hours shown on this time sheet and I confirm that it shows the hours which I actually worked. By signing below, I acknowledge the accuracy of the time(s) shown and assure my employer that I did not work any additional time.
        </Text>




        {/* Employee Name */}
        <View style={styles.rightAlignedText}>
          <View style={{ width: "50%" }}>
            <Text style={styles.label}>Employee Name: {props.name}</Text>
            <Text style={styles.label}>Signature:______________________</Text>
          </View>
        </View>
        {/* Signature */}

        {/* Week */}
        <Text style={styles.week}>Week {props.startdate} to {props.enddate}</Text>
        <View style={{width:"100%", borderBottom:"1px solid black", margin:"2px 0"}}></View>
        {/* Date */}
        <Text style={styles.date}>Date: {props.date}</Text>

        {/* Spanish version */}
        <Text style={styles.header}>RECONOCIMIENTO DE HORAS TRABAJADAS</Text>
        <Text style={styles.para}>
          He revisado cuidadosamente las horas que se muestran en esta hoja de tiempo y confirmo que muestra las horas en las que realmente trabajé. Al firmar abajo, reconozco la precisión de los horarios mostrados y le aseguro a mi empleador que no trabajé ningún tiempo adicional.
        </Text>

        {/* Nombre de empleado */}
        <View style={styles.rightAlignedText}>
          <View style={{ width: "50%" }}>
            <Text style={styles.label}>Nombre de empleado: {props.name}</Text>
            <Text style={styles.label}>Firma: ______________________</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};



export default SalaryPDF;



