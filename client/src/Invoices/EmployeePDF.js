import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import env from "react-dotenv";

const EmployeePDF = (props) => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "white",
    },
    section: {
      margin: 10,
      padding: 100,
      flexGrow: 1,
    },
    text: {
      fontSize: "12px",
      fontWeight: "200",
    },
  });


  const date = new Date()
  let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

  return (
    <Document>
      {/** Page defines a single page of content. */}
      <Page size="LETTER" style={styles.page}>
          <View style={styles.section}>
          
          <Text style={styles.text}>{props.name}</Text>
          <Text style={styles.text}>[City, State, ZIP Code]</Text>
          <Text style={styles.text}>{props.email}</Text>
          <Text style={styles.text}>{props.phone}</Text>
          <Text style={styles.text}>{day}-{month}-{year}</Text>
          <Text style={{ marginBottom: "20px" }}>{""}</Text>



          <Text style={styles.text}>Shalbro Construction Group Llc</Text>
          <Text style={styles.text}>8109 101st Ave,</Text>
          <Text style={styles.text}>Queens, NY 11416,</Text>
          <Text style={styles.text}>United States</Text>
          <Text style={{marginBottom:"20px"}}>{""}</Text>
          <Text style={styles.text}>
            Dear Shalbro Construction Group LLC, I am writing this letter to
            express my sincere appreciation and acknowledgment for the
            exceptional services provided by your company. It is with great
            pleasure that I extend my gratitude for the outstanding construction
            work completed at [mention the project/location]. From the initial
            consultation to the final stages of construction, Shalbro
            Construction Group LLC has demonstrated the highest level of
            professionalism, expertise, and dedication. Your team's attention to
            detail, efficiency, and commitment to delivering quality results
            have truly impressed me throughout the entire project. I would like
            to commend your team for their remarkable craftsmanship, timeliness,
            and ability to meet project deadlines. The level of communication
            and collaboration exhibited by your staff has been exceptional,
            ensuring a smooth and transparent construction process. Not only did
            Shalbro Construction Group LLC deliver a project of exceptional
            quality, but your team also exceeded my expectations in terms of
            customer service. Your responsiveness to inquiries and willingness
            to address any concerns or modifications promptly has been
            commendable. I am confident that Shalbro Construction Group LLC will
            continue to thrive and maintain its reputation as a leading
            construction company. Your commitment to excellence and customer
            satisfaction sets you apart from others in the industry. Once again,
            I would like to express my heartfelt gratitude for the outstanding
            services provided by Shalbro Construction Group LLC. It has been a
            pleasure working with your company, and I look forward to any future
            collaborations. Thank you for your dedication, professionalism, and
            commitment to delivering exceptional construction services.
            Sincerely,
          </Text>
          <Text style={{marginBottom:"20px"}}>{""}</Text>
          <Text style={styles.text}>{props.name}</Text>
          <Text style={styles.text}>{day}-{month}-{year}</Text>
        </View>
        
        
      </Page>
    </Document>
  );
};
export default EmployeePDF;
