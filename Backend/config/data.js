const responses = {
  default:
    "I'm sorry, I couldn’t understand that. Please ask about courses, fees, hostel, or admissions.",

  // 🎓 Courses
  courses: `
NIET offers various undergraduate and postgraduate programs:
- B.Tech: CSE, IT, AI & ML, Data Science, Electronics, Mechanical, Civil, Electrical.
- M.Tech: AI, VLSI, Mechanical Design, Structural Engg.
- MBA & MCA: Industry-focused programs with practical learning.
All programs are AICTE approved and affiliated to AKTU.
`,

  mechanical_courses: `
Mechanical Engineering at NIET
- Duration: 4 years (8 semesters)
- Labs: CAD/CAM, Fluid Mechanics, Thermodynamics, Robotics
- Key Subjects: Machine Design, Heat Transfer, Automobile Engineering
- Placement: Core companies like TATA, Mahindra, Hero, Ashok Leyland visit every year.
`,

  electrical_courses: `
Electrical Engineering at NIET
- Focus: Power systems, control, and renewable energy
- Labs: Electrical Machines, Power Electronics, Smart Grid
- Career: Opportunities in NTPC, BHEL, Siemens, and other power companies.
`,

  ai_courses: `
Artificial Intelligence & Machine Learning
- Duration: 4 years (B.Tech)
- Subjects: Python, Neural Networks, Deep Learning, Data Science
- Labs: AI Lab, IoT Lab, Data Science Lab
- Placement: Companies like TCS, Infosys, and Amazon hire AI/ML graduates.
`,

  // 💰 Fees
  fees: `
The fee structure at NIET is transparent and affordable:
- B.Tech:₹1.45 Lakhs/year
- M.Tech: ₹1.10 Lakhs/year
- MBA:₹1.25 Lakhs/year
- MCA: ₹1.05 Lakhs/year
- Hostel Fee:₹85,000 – ₹1,20,000 (depending on AC/Non-AC)
Mess and laundry are included for most hostels. Installments allowed.
`,

  // 🏠 Hostel fees by year & room type
  hostel: `
NIET provides comfortable hostels for boys and girls.
You can ask me detailed hostel fees like:
"Hostel fee for 1st year double seater AC" or "4th year single Non-AC".
,

  // 🎯 Structured hostel fee data
  hostelFees: {
    AC: {
      1: { single: 130000, double: 115000, triple: 100000, four: 90000 },
      2: { single: 125000, double: 110000, triple: 95000, four: 90000 },
      3: { single: 120000, double: 105000, triple: 90000, four: 85000 },
      4: { single: 115000, double: 100000, triple: 85000, four: 80000 },
    },
    NonAC: {
      1: { single: 100000, double: 90000, triple: 85000, four: 80000 },
      2: { single: 95000, double: 85000, triple: 80000, four: 75000 },
      3: { single: 90000, double: 80000, triple: 75000, four: 70000 },
      4: { single: 85000, double: 75000, triple: 70000, four: 65000 },
    },
  },
`,

  // 🎯 Admission process
  admissions: `
Admission Process at NIET
- Apply through AKTU Counseling (UPSEE) or Direct Admission.
- Documents Required: 10th & 12th Marksheet, ID Proof, Transfer Certificate, etc.
- Fee Payment: Online or DD.
- Helpline: +91-XXXXXXXXXX or visit [www.niet.co.in](https://www.niet.co.in)
`,

  // 🏢 Placement
  placement: `
Placement Highlights
- Top recruiters: TCS, Wipro, Infosys, HCL, Cognizant, Tech Mahindra, Amazon.
- Average Package: ₹6 LPA | Highest: ₹32 LPA (Amazon)
- Training: NIET provides pre-placement mock tests, resume building & internships.
`,

  // 🏫 Infrastructure
  infrastructure: `
Campus Infrastructure
- 13 Academic Blocks
- 2 Libraries (Digital + Physical)
- Hostel capacity: 3000+ students
- Sports Complex, Gym, Canteens, Wi-Fi campus
- 24x7 Medical Center and Shuttle Buses
`,
};

module.exports = responses;
