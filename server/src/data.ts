export type Role = 'trainee' | 'trainer' | 'admin';
export type AccountStatus = 'active' | 'pending' | 'suspended' | 'disabled' | 'rejected';
export type DiagnosticTestStatus = 'not_started'|'in_progress'|'completed';
export type User = { id:string; name:string; email:string; password:string; role:Role; status:AccountStatus; organizationId:string; department:string; jobRole:string; onboardingComplete?:boolean; diagnosticComplete?:boolean; diagnosticTestStatus?:DiagnosticTestStatus; approvalRequired?:boolean };
export const organization = { id:'org-imd', name:'India Meteorological Department', shortName:'IMD' };
export const users:User[] = [
  {id:'u1',name:'Ananya Sharma',email:'ananya@imd.gov.in',password:'Demo@123',role:'trainee',status:'active',organizationId:organization.id,department:'Forecast Operations',jobRole:'Weather Analyst',onboardingComplete:true,diagnosticComplete:true,diagnosticTestStatus:'completed'},
  {id:'u2',name:'Dr. Rao',email:'rao@imd.gov.in',password:'Demo@123',role:'trainer',status:'active',organizationId:organization.id,department:'Training & Capacity',jobRole:'Senior Meteorologist',onboardingComplete:true},
  {id:'u3',name:'IMD Administrator',email:'admin@imd.gov.in',password:'Demo@123',role:'admin',status:'active',organizationId:organization.id,department:'National Centre',jobRole:'Administrator',onboardingComplete:true},
  {id:'u4',name:'Rahul Verma',email:'rahul@imd.gov.in',password:'Demo@123',role:'trainee',status:'active',organizationId:organization.id,department:'Forecast Operations',jobRole:'Forecast Officer',onboardingComplete:true,diagnosticComplete:true,diagnosticTestStatus:'completed'},
  {id:'u5',name:'Priya Nair',email:'priya@imd.gov.in',password:'Demo@123',role:'trainee',status:'active',organizationId:organization.id,department:'Satellite Services',jobRole:'Remote Sensing Analyst',onboardingComplete:true,diagnosticComplete:true,diagnosticTestStatus:'completed'},
  {id:'u6',name:'Dr. Meera Iyer',email:'meera@imd.gov.in',password:'Demo@123',role:'trainer',status:'active',organizationId:organization.id,department:'Satellite Services',jobRole:'Remote Sensing Specialist',onboardingComplete:true},
  {id:'u7',name:'Dr. Kavya Menon',email:'kavya@imd.gov.in',password:'Demo@123',role:'trainer',status:'pending',organizationId:organization.id,department:'Climate Services',jobRole:'Climate Scientist',onboardingComplete:true},
];

export const competencies = [
  {id:'c1',name:'Data Processing',domain:'Data & Technology',current:73,required:80,level:'Proficient',gap:7,priority:'Moderate'},
  {id:'c2',name:'Forecast Interpretation',domain:'Meteorology',current:86,required:85,level:'Advanced',gap:0,priority:'On target'},
  {id:'c3',name:'Communication',domain:'Professional Skills',current:61,required:75,level:'Working',gap:14,priority:'High'},
  {id:'c4',name:'Satellite Meteorology',domain:'Remote Sensing',current:68,required:80,level:'Working',gap:12,priority:'High'},
];
export const courses = [
  {id:'course1',title:'Data Processing Fundamentals',description:'Build practical skills for cleaning, validating and preparing operational weather data.',trainerId:'u2',trainer:'Dr. Rao',level:'Foundation',duration:'4 weeks',competencies:['Data Processing'],progress:68,modules:6,learners:42,status:'Published',recommended:true,prerequisites:'Basic data handling',objectives:['Clean and validate operational data','Apply repeatable processing workflows','Explain quality checks']},
  {id:'course2',title:'Satellite Meteorology — Advanced',description:'Interpret satellite observations and connect remote-sensing signals to operational analysis.',trainerId:'u6',trainer:'Dr. Meera Iyer',level:'Advanced',duration:'6 weeks',competencies:['Satellite Meteorology'],progress:0,modules:8,learners:28,status:'Published',recommended:true,prerequisites:'Working meteorology knowledge',objectives:['Interpret satellite imagery','Connect signals to weather systems','Use remote-sensing evidence in analysis']},
  {id:'course3',title:'Operational Communication',description:'Communicate forecast insights clearly across teams and decision-makers.',trainerId:'u2',trainer:'Dr. Rao',level:'Working',duration:'3 weeks',competencies:['Communication'],progress:24,modules:5,learners:36,status:'Published',recommended:true,prerequisites:'None',objectives:['Structure operational updates','Explain risk clearly','Communicate decisions with evidence']},
  {id:'course4',title:'Forecast Interpretation',description:'Strengthen interpretation of model guidance and operational forecast signals.',trainerId:'u6',trainer:'Dr. Meera Iyer',level:'Advanced',duration:'5 weeks',competencies:['Forecast Interpretation'],progress:100,modules:7,learners:31,status:'Published',recommended:false,prerequisites:'Operational forecasting',objectives:['Interpret model guidance','Compare forecast signals','Communicate uncertainty']},
  {id:'course5',title:'Monsoon Systems: Applied Analysis',description:'Draft course awaiting review and publication by the organization.',trainerId:'u7',trainer:'Dr. Kavya Menon',level:'Advanced',duration:'5 weeks',competencies:['Forecast Interpretation'],progress:0,modules:6,learners:0,status:'Submitted',recommended:false,prerequisites:'Advanced meteorology',objectives:['Analyze monsoon signals','Build evidence-led outlooks']},
];
export const skillGaps = [
  {skill:'Data Processing',current:73,required:80,gap:7,priority:'Moderate',course:'Data Processing Fundamentals',courseId:'course1',reason:'Your current level is below the required level for Weather Analyst.'},
  {skill:'Communication',current:61,required:75,gap:14,priority:'High',course:'Operational Communication',courseId:'course3',reason:'Communication is a high-priority role skill and is below target.'},
  {skill:'Satellite Meteorology',current:68,required:80,gap:12,priority:'High',course:'Satellite Meteorology — Advanced',courseId:'course2',reason:'This course directly covers the missing remote-sensing skills.'},
];
export const trainerMatches = [
  {id:'u2',name:'Dr. Rao',match:94,expertise:'Data Processing',reason:'Strong subject expertise, relevant course experience and learner support history.'},
  {id:'u6',name:'Dr. Meera Iyer',match:87,expertise:'Remote Sensing',reason:'Advanced satellite meteorology expertise and strong certification record.'},
  {id:'u7',name:'Dr. Kavya Menon',match:73,expertise:'Climate Services',reason:'Relevant scientific background, but the profile is still pending approval.'},
];
export const learners = [
  {id:'u1',name:'Ananya Sharma',skill:'Data Processing',current:73,required:80,progress:68,status:'Needs Support'},
  {id:'u4',name:'Rahul Verma',skill:'Communication',current:58,required:75,progress:44,status:'Needs Support'},
  {id:'u5',name:'Priya Nair',skill:'Satellite Meteorology',current:79,required:80,progress:91,status:'On Track'},
];
export const notifications = [
  {id:'n1',userId:'u1',title:'Assessment due tomorrow',body:'Your Data Processing assessment is due tomorrow.',time:'2h ago',read:false},
  {id:'n2',userId:'u1',title:'Support plan assigned',body:'Dr. Rao added a Data Cleaning Practice activity.',time:'1d ago',read:true},
  {id:'n3',userId:'u1',title:'New learning content',body:'Satellite Meteorology — Advanced is now available.',time:'2d ago',read:true},
];
export const interventions:any[] = [{id:'i1',learnerId:'u1',trainerId:'u2',action:'Practice activity',message:'Focus on Data Cleaning practice, then take the reassessment.',status:'Assigned',createdAt:'Today'}];
export const certificates = [{id:'cert1',certificateId:'CC-2026-00124',holderId:'u1',holder:'Ananya Sharma',course:'Forecast Interpretation',issued:'22 Aug 2026',valid:true}];
export const announcements:any[] = [{id:'a1',title:'New learning content',body:'Satellite Meteorology — Advanced is now available.',audience:'Everyone',createdAt:'Today'}];
export const roleRequirements:any[] = [
  {id:'rr1',role:'Weather Analyst',department:'Forecast Operations',competency:'Data Processing',required:80,importance:'High'},
  {id:'rr2',role:'Weather Analyst',department:'Forecast Operations',competency:'Forecast Interpretation',required:85,importance:'High'},
  {id:'rr3',role:'Weather Analyst',department:'Forecast Operations',competency:'Communication',required:75,importance:'Medium'},
  {id:'rr4',role:'Remote Sensing Analyst',department:'Satellite Services',competency:'Satellite Meteorology',required:80,importance:'High'},
  {id:'rr5',role:'Forecast Officer',department:'Forecast Operations',competency:'Forecast Interpretation',required:85,importance:'High'},
  {id:'rr6',role:'Forecast Officer',department:'Forecast Operations',competency:'Communication',required:78,importance:'High'},
  {id:'rr7',role:'Forecast Officer',department:'Forecast Operations',competency:'Data Processing',required:72,importance:'Medium'},
];


export const enrollments:any[] = [{id:'e1',courseId:'course1',traineeId:'u1',progress:68,status:'In Progress'},{id:'e2',courseId:'course3',traineeId:'u1',progress:24,status:'In Progress'},{id:'e3',courseId:'course4',traineeId:'u1',progress:100,status:'Completed'},{id:'e4',courseId:'course2',traineeId:'u5',progress:72,status:'In Progress'},{id:'e5',courseId:'course1',traineeId:'u4',progress:44,status:'In Progress'}];
export const feedback:any[] = [];
export const trainingRequests:any[] = [];

export const resources:any[] = [
  {id:'r1',ownerId:'u2',courseId:'course1',title:'Study guide',type:'PDF',competency:'Data Processing',access:'Private',version:1,status:'Published',fileName:'data-processing-study-guide.pdf',description:'Core concepts and examples for operational data quality.'},
  {id:'r2',ownerId:'u2',courseId:'course1',title:'Operational examples',type:'Presentation',competency:'Data Processing',access:'Private',version:2,status:'Published',fileName:'operational-examples.pptx',description:'Worked examples for data preparation and validation.'},
  {id:'r3',ownerId:'u2',courseId:'course1',title:'Core concepts',type:'Recorded lecture',competency:'Data Processing',access:'Private',version:1,status:'Published',fileName:'core-concepts.mp4',description:'Short recorded walkthrough of the learning foundations.'},
];
export const trainerAssessments:any[] = [
  {id:'assess1',ownerId:'u2',courseId:'course1',title:'Data Processing Assessment',instructions:'Check the practical concepts covered in the course.',competency:'Data Processing',deadline:'Tomorrow',timeLimitMinutes:20,passingScore:70,attemptLimit:1,status:'Open',questions:[
    {id:'q1',skill:'Data Cleaning',text:'Which step should happen before validating a dataset?',options:['Inspect and clean missing or invalid values','Publish the dataset','Archive the dataset','Skip quality checks'],correct:0,marks:1},
    {id:'q2',skill:'Data Validation',text:'Why is a validation rule useful?',options:['It makes a file larger','It checks whether data meets expected conditions','It hides errors','It removes all historical records'],correct:1,marks:1},
    {id:'q3',skill:'Operational Practice',text:'What is a good response to an unexpected outlier?',options:['Delete it immediately','Investigate it and record the decision','Ignore it','Change the target score'],correct:1,marks:1},
    {id:'q4',skill:'Quality Checks',text:'Which evidence best supports a quality decision?',options:['A guess','A documented check and result','A screenshot with no context','No evidence'],correct:1,marks:1}
  ]},
  {id:'assess2',ownerId:'u6',courseId:'course4',title:'Forecast Interpretation Check',instructions:'Check how well you can interpret forecast guidance and uncertainty.',competency:'Forecast Interpretation',deadline:'Friday',timeLimitMinutes:15,passingScore:70,attemptLimit:2,status:'Open',questions:[
    {id:'q1',skill:'Forecast Signals',text:'What should you compare when interpreting a forecast?',options:['Only one model run','Multiple evidence sources and model signals','Only yesterday’s forecast','No observations'],correct:1,marks:1},
    {id:'q2',skill:'Uncertainty',text:'What is a useful way to communicate forecast uncertainty?',options:['Hide uncertainty','Explain the range and supporting evidence','Use a random value','Remove observations'],correct:1,marks:1},
    {id:'q3',skill:'Operational Judgement',text:'When model guidance conflicts with observations, what should you do?',options:['Investigate the difference','Ignore observations','Publish immediately','Change the target'],correct:0,marks:1}
  ]},
  {id:'assess3',ownerId:'u2',courseId:'course3',title:'Operational Communication Check',instructions:'Practice clear, evidence-led operational communication.',competency:'Communication',deadline:'Next week',timeLimitMinutes:15,passingScore:70,attemptLimit:2,status:'Open',questions:[
    {id:'q1',skill:'Clear Updates',text:'What makes an operational update easy to act on?',options:['A clear message, evidence and next step','Long unexplained detail','Only a score','No context'],correct:0,marks:1},
    {id:'q2',skill:'Risk Communication',text:'How should important risk information be presented?',options:['Clearly with context and impact','Only in technical jargon','Without evidence','As a hidden note'],correct:0,marks:1},
    {id:'q3',skill:'Decision Support',text:'What should a useful operational message help the reader understand?',options:['What changed and what to do next','Only the author’s opinion','Nothing beyond the title','Only the data source'],correct:0,marks:1}
  ]}
];

export const assessmentAttempts:any[] = [];
export const traineeProgress:Record<string,any> = {
  u1:{competency:73,previous:63,diagnostic:55,competencies:{'Data Processing':73,'Forecast Interpretation':86,'Communication':61,'Satellite Meteorology':68}},
  u4:{competency:58,previous:58,diagnostic:58,competencies:{'Forecast Interpretation':72,'Communication':58,'Data Processing':62}},
  u5:{competency:79,previous:75,diagnostic:79,competencies:{'Satellite Meteorology':79}}
};




// Role-specific diagnostic bank. The diagnostic is generated from the trainee's
// declared job role, so a new trainee is tested on the competencies that role needs.
export const trainerProfiles:Record<string,any> = {
  u2:{organization:'India Meteorological Department',department:'Training & Capacity',role:'Senior Meteorologist',qualification:'Ph.D. Meteorology',experience:'12 years',expertise:['Data Processing','Forecasting','Operational Meteorology'],certifications:['IMD Advanced Training Certification'],bio:'Experienced in operational meteorology training, data quality and evidence-led forecasting.'},
  u6:{organization:'India Meteorological Department',department:'Satellite Services',role:'Remote Sensing Specialist',qualification:'Ph.D. Remote Sensing',experience:'10 years',expertise:['Satellite Meteorology','Remote Sensing','Forecast Interpretation'],certifications:['Advanced Satellite Meteorology Certification'],bio:'Specialist in satellite interpretation and remote-sensing evidence for operational analysis.'},
  u7:{organization:'India Meteorological Department',department:'Climate Services',role:'Climate Scientist',qualification:'M.Sc. Climate Science',experience:'8 years',expertise:['Climate Services','Forecast Applications'],certifications:['Climate Services Training Certification'],bio:'Climate services specialist focused on evidence-led decision support.'}
};

export const traineeProfiles:Record<string,any> = {
  u1:{qualification:'M.Sc. Atmospheric Science',experience:'2 years',skills:['Data Processing','Forecast Interpretation'],interests:['Remote Sensing','Numerical Weather Prediction'],certificates:['Forecast Interpretation Certificate']},
  u4:{qualification:'M.Sc. Meteorology',experience:'3 years',skills:['Forecast Interpretation','Communication'],interests:['Forecast Operations'],certificates:[]},
  u5:{qualification:'M.Tech. Remote Sensing',experience:'4 years',skills:['Satellite Meteorology'],interests:['Remote Sensing'],certificates:[]}
};

export const diagnosticQuestionBank: Record<string, any[]> = {
  'Weather Analyst': [
    {id:'wa1',skill:'Data Processing',text:'What should you do first when receiving a new operational dataset?',options:['Inspect structure and data quality','Publish it immediately','Skip validation','Delete unusual records'],correct:0},
    {id:'wa2',skill:'Data Processing',text:'Why are validation checks important in operational data?',options:['They check data against expected rules','They make data look better','They remove the need for review','They replace observations'],correct:0},
    {id:'wa3',skill:'Forecast Interpretation',text:'What is the best way to interpret conflicting forecast signals?',options:['Compare models with observations and context','Choose the first model result','Ignore observations','Use only yesterday’s forecast'],correct:0},
    {id:'wa4',skill:'Forecast Interpretation',text:'How should uncertainty be communicated to a decision-maker?',options:['Explain the range, confidence and evidence','Hide the uncertainty','Give one unexplained number','Avoid mentioning assumptions'],correct:0},
    {id:'wa5',skill:'Communication',text:'What makes an operational update easy to act on?',options:['Clear message, evidence and next step','Long technical detail only','A score without context','No recommendation'],correct:0},
    {id:'wa6',skill:'Communication',text:'What should a weather briefing prioritize?',options:['What changed, why it matters and what to do','Every available technical detail','Only raw observations','Only the final conclusion'],correct:0},
    {id:'wa7',skill:'Satellite Meteorology',text:'How can satellite observations help an analyst?',options:['They add spatial and atmospheric evidence','They replace every other data source','They are useful only for images','They should be ignored when models exist'],correct:0},
    {id:'wa8',skill:'Forecast Interpretation',text:'What is a useful response when a model run changes sharply?',options:['Check observations, previous runs and causes','Accept it without review','Delete the new run','Change the target level'],correct:0},
    {id:'wa9',skill:'Data Processing',text:'What should happen when an outlier appears in operational data?',options:['Investigate and document the decision','Delete it immediately','Ignore it always','Change the validation rule to hide it'],correct:0},
    {id:'wa10',skill:'Communication',text:'Which evidence makes a forecast recommendation more trustworthy?',options:['A clear conclusion supported by relevant evidence','A confident statement without evidence','A long message with no action','An unexplained score'],correct:0}
  ],
  'Forecast Officer': [
    {id:'fo1',skill:'Forecast Interpretation',text:'What should you compare before issuing an operational forecast?',options:['Model guidance, observations and recent trends','Only one model run','Only yesterday’s forecast','No observations'],correct:0},
    {id:'fo2',skill:'Forecast Interpretation',text:'What is the best way to handle forecast uncertainty?',options:['State the range and supporting evidence','Hide uncertainty','Use a single unexplained value','Avoid discussing risk'],correct:0},
    {id:'fo3',skill:'Communication',text:'What should an operational forecast message make clear?',options:['Expected impact, timing and next action','Only technical terminology','Only the model name','No decision guidance'],correct:0},
    {id:'fo4',skill:'Data Processing',text:'Why should forecast inputs be checked before use?',options:['To catch missing, invalid or inconsistent values','To make the report longer','To remove all unusual values','To avoid documenting changes'],correct:0},
    {id:'fo5',skill:'Forecast Interpretation',text:'When observations disagree with a model, what should you do?',options:['Investigate the difference using multiple evidence sources','Ignore the observations','Publish the model result immediately','Change observations to match the model'],correct:0},
    {id:'fo6',skill:'Communication',text:'What is a good structure for a short forecast briefing?',options:['Situation, expected change, impact and action','Raw data followed by no conclusion','Only a long background section','Only a final score'],correct:0},
    {id:'fo7',skill:'Data Processing',text:'What is a good quality-control practice?',options:['Use repeatable checks and record exceptions','Rely only on memory','Skip checks when busy','Change values without recording it'],correct:0},
    {id:'fo8',skill:'Forecast Interpretation',text:'Why compare multiple forecast runs?',options:['To understand trends, changes and uncertainty','To pick the newest number automatically','To avoid using observations','To remove the need for judgement'],correct:0},
    {id:'fo9',skill:'Communication',text:'How should high-impact weather risk be presented?',options:['Clearly state impact, timing and evidence','Use only technical jargon','Hide the impact to avoid concern','Give no timeframe'],correct:0},
    {id:'fo10',skill:'Data Processing',text:'What is the safest response to a suspicious input value?',options:['Verify it against source data and document the decision','Delete it without checking','Ignore it','Change the expected value'],correct:0}
  ],
  'Remote Sensing Analyst': [
    {id:'rs1',skill:'Satellite Meteorology',text:'What is important when interpreting satellite imagery?',options:['Connect observed patterns with atmospheric context','Look only at image colour','Ignore time information','Ignore other observations'],correct:0},
    {id:'rs2',skill:'Satellite Meteorology',text:'Why is the time of a satellite observation important?',options:['It helps relate the image to evolving weather conditions','It changes the image quality automatically','It replaces all ground observations','It is not relevant operationally'],correct:0},
    {id:'rs3',skill:'Data Processing',text:'What should happen before using satellite data operationally?',options:['Check quality, coverage and missing data','Publish it immediately','Ignore metadata','Skip validation'],correct:0},
    {id:'rs4',skill:'Forecast Interpretation',text:'How can satellite evidence strengthen an analysis?',options:['Use it with models and observations to build a fuller picture','Replace every model with imagery','Use only one image','Ignore forecast context'],correct:0},
    {id:'rs5',skill:'Satellite Meteorology',text:'What should you do when an image contains an unexpected feature?',options:['Investigate the feature using time, context and other evidence','Delete the image','Assume it is correct without checking','Ignore the feature'],correct:0},
    {id:'rs6',skill:'Data Processing',text:'Why should metadata be retained with satellite data?',options:['It explains when, where and how the data was captured','It makes files look complete','It removes the need for quality checks','It is only useful for storage'],correct:0},
    {id:'rs7',skill:'Communication',text:'How should a remote-sensing finding be reported?',options:['State the finding, evidence, uncertainty and operational meaning','Give only image coordinates','Use unexplained technical terms','Give no conclusion'],correct:0},
    {id:'rs8',skill:'Satellite Meteorology',text:'What helps distinguish a real atmospheric signal from an artefact?',options:['Compare quality indicators, nearby observations and time sequence','Use colour alone','Ignore quality information','Choose the strongest-looking pixel'],correct:0},
    {id:'rs9',skill:'Forecast Interpretation',text:'What is a good use of satellite observations with forecast models?',options:['Check whether observed features support or challenge the forecast','Accept the model without comparison','Ignore observations','Change the observation to fit the model'],correct:0},
    {id:'rs10',skill:'Communication',text:'What makes a satellite-based operational alert useful?',options:['Clear signal, confidence, impact and recommended action','Only a technical image name','A long description without action','Only a confidence number'],correct:0}
  ]
};

trainerAssessments.push({id:'assess4',ownerId:'u6',courseId:'course2',title:'Satellite Meteorology Applied Check',instructions:'Check your understanding of satellite evidence and operational interpretation.',competency:'Satellite Meteorology',deadline:'Next week',timeLimitMinutes:25,passingScore:70,attemptLimit:2,status:'Open',questions:[
{id:'q1',skill:'Satellite Interpretation',text:'What should you consider when interpreting a satellite image?',options:['Pattern, time and atmospheric context','Colour only','One pixel only','No context'],correct:0,marks:1},
{id:'q2',skill:'Satellite Interpretation',text:'Why is the observation time important?',options:['It connects the image to evolving conditions','It replaces quality checks','It is only for storage','It has no operational value'],correct:0,marks:1},
{id:'q3',skill:'Quality Control',text:'What should you check before using satellite data?',options:['Coverage, quality indicators and metadata','Only the filename','Nothing if the image looks clear','Only the colour scale'],correct:0,marks:1},
{id:'q4',skill:'Evidence',text:'What strengthens a satellite-based conclusion?',options:['Agreement with other relevant evidence','A single image with no context','A confident statement only','No uncertainty'],correct:0,marks:1},
{id:'q5',skill:'Operational Use',text:'What is a useful output from remote sensing analysis?',options:['A clear finding, evidence, uncertainty and action','Only raw coordinates','Only an image title','A score without explanation'],correct:0,marks:1}
]});
