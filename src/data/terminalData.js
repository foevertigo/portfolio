// terminalData.js

const terminalData = {
    name: 'Aleena Burney',
    taglines: [
        'building projects and learning offensive security',
    ],

    about: [
        "Hi, I'm an IT undergraduate passionate about software development, AI/ML, and purple team cybersecurity.",
        "I'm a collaborative team player and a creative problem solver, constantly building projects and exploring offensive security to level up my skills."
    ],

    skills: {
        'Languages': ['JavaScript', 'Python', 'Java', 'C', 'C++'],
        'Web Development': ['React.js', 'Node.js', 'Express.js', 'HTML5', 'CSS3'],
        'Databases': ['MongoDB', 'MySQL', 'SQL'],
        'Computer Fundamentals': ['DSA', 'OOP', 'Operating Systems', 'DBMS', 'Computer Networks(Basics)', 'LLD', 'SDLC'],
        'Machine Learning': ['scikit-learn', 'Pandas', 'NumPy', 'TensorFlow', 'Keras', 'YOLOv8', 'Computer Vision'],
        'Cybersecurity Tools': ['Linux', 'Shodan', 'Nmap', 'ZenMap', 'Openvas', 'Nessus', 'Wireshark', 'Crunch', 'Httrack', 'Virustotal', 'Zphisher', 'Cewl', 'Hash-identifier', 'John the ripper', 'Impacket (GetNPUsers, GetUserSPNs, secretsdump, wmiexec, kerberos)'],
        'DevOps Tools': ['Git', 'GitHub', 'VS Code', 'Postman', 'Google Colab', 'Vercel', 'Render']
    },

    projects: [
        {
            name: 'SB Works– Full-Stack Freelance Marketplace',
            description: 'Built a scalable freelance marketplace following SDLC best practices with JWT authentication and MongoDB schemas, enabling secure project lifecycle management. Implemented WebSocket-based real-time chat and bidding (<100ms latency) and optimized UI using Material UI & Bootstrap, improving responsiveness by 30%.',
            github: 'https://github.com/SB-WORKS',
            tools: ['React.js', 'Node.js', 'Express', 'WebSockets', 'MongoDB']
        },
        {
            name: 'GreenID– AI-Powered Sustainability Platform',
            description: 'Developed a Flask ML microservice verifying 3+ eco-activities using supervised learning (MobileNetV2), achieving 94.8% accuracy and 80% faster verification on a 1,200+ image dataset. Integrated YOLOv8 detection and geospatial validation (Haversine + GPS telemetry), reducing false positives by 65% and enabling 60 FPS real-time analysis.',
            github: 'https://github.com/GreenID',
            tools: ['Python', 'Flask', 'TensorFlow', 'YOLOv8', 'NumPy']
        },
        {
            name: 'ADAttackLab- Active Directory Attack Simulation Lab',
            description: 'Built a 2-VM Active Directory lab simulating enterprise attack paths including AS-REP Roasting, Kerberoasting, credential dumping, and Pass-the-Hash. Executed a full attack chain using Nmap and Impacket, escalating from unauthenticated access to Domain Admin compromise, extracting NTDS.dit hashes and achieving SYSTEM-level control.',
            github: 'https://github.com/foevertigo/ADAttackLab',
            tools: ['Kali Linux', 'Windows Server 2022', 'Nmap', 'Impacket', 'John the Ripper']
        },
        {
            name: 'Skydra - NIDAR National Drone Innovation Challenge',
            description: 'A dual-drone autonomous architecture designed for surveillance, target identification, and precision payload delivery in disaster-response scenarios. Includes a Scout Drone running a ROS-based perception pipeline with YOLO inference, and a Delivery Drone for precise payload deployment via MAVLink injection.',
            github: 'https://github.com/Skydra-Drone',
            image: '/images/skydra/WhatsApp Image 2026-03-09 at 11.58.34 PM.jpeg',
            tools: ['Ubuntu 20.04 (WSL2 supported)', 'ROS Noetic Ninjemys', 'IPWebcam', 'Ultralytics', 'NumPy', 'OpenCV', 'PyMAVLink']
        }
    ],

    contacts: [
        { label: 'GitHub', url: 'https://www.github.com/foevertigo' },
        { label: 'LinkedIn', url: 'https://www.linkedin.com/in/aleena-burney' },
        { label: 'Email', url: 'mailto:aleenaburney17@gmail.com' },
    ],
};

export default terminalData;
