const PREFIX_API = 'http://localhost:7001/api';

const PREFIX_API_ADMID = PREFIX_API + '/admin';

export default {
  // login
  smsSend: `${PREFIX_API_ADMID}/sms/send`,
  smsLogin: `${PREFIX_API_ADMID}/sms/login`,
  getPermissions: `${PREFIX_API_ADMID}/auth/permissions`,

  // qiniu
  qiniuToken: `${PREFIX_API_ADMID}/qiniu/token`,

  // course
  course: `${PREFIX_API_ADMID}/course`,
  theCourse: id => `${PREFIX_API_ADMID}/course/${id}`,

  // chapter
  chapter: `${PREFIX_API_ADMID}/chapter`,
  theChapter: id => `${PREFIX_API_ADMID}/chapter/${id}`,
  sortChapter: `${PREFIX_API_ADMID}/sort/chapter`,

  // section
  section: `${PREFIX_API_ADMID}/section`,
  theSection: id => `${PREFIX_API_ADMID}/section/${id}`,
  sortSection: `${PREFIX_API_ADMID}/sort/section`,

  // career
  career: `${PREFIX_API_ADMID}/career`,
  theCareer: id => `${PREFIX_API_ADMID}/career/${id}`,

  // path
  path: `${PREFIX_API_ADMID}/path`,
  thePath: id => `${PREFIX_API_ADMID}/path/${id}`,
  sortPath: `${PREFIX_API_ADMID}/sort/path`,

  // career_course
  careerCourse: `${PREFIX_API_ADMID}/career_course`,
  theCareerCourse: id => `${PREFIX_API_ADMID}/career_course/${id}`,
  sortCareerCourse: `${PREFIX_API_ADMID}/sort/career_course`,

  // enterprise
  company: `${PREFIX_API_ADMID}/company`,
  theCompany: id => `${PREFIX_API_ADMID}/company/${id}`,

  // project
  project: `${PREFIX_API_ADMID}/project`,
  theProject: id => `${PREFIX_API_ADMID}/project/${id}`,

  // version
  version: `${PREFIX_API_ADMID}/version`,
  theVersion: id => `${PREFIX_API_ADMID}/version/${id}`,
  sortVersion: `${PREFIX_API_ADMID}/sort/version`,

  // story
  story: `${PREFIX_API_ADMID}/story`,
  theStory: id => `${PREFIX_API_ADMID}/story/${id}`,
  sortStory: `${PREFIX_API_ADMID}/sort/story`,

  // task
  task: `${PREFIX_API_ADMID}/task`,
  theTask: id => `${PREFIX_API_ADMID}/task/${id}`,
  sortTask: `${PREFIX_API_ADMID}/sort/task`,

  // ability
  ability: `${PREFIX_API_ADMID}/ability`,
  theAbility: id => `${PREFIX_API_ADMID}/ability/${id}`,

  // question
  question: `${PREFIX_API_ADMID}/question`,
  theQuestion: id => `${PREFIX_API_ADMID}/question/${id}`,

  // manager
  manager: `${PREFIX_API_ADMID}/manager`,
  theManager: id => `${PREFIX_API_ADMID}/manager/${id}`,
  managerInfo: `${PREFIX_API_ADMID}/manager-info`,

  // role
  role: `${PREFIX_API_ADMID}/role`,
  theRole: id => `${PREFIX_API_ADMID}/role/${id}`,

  // permissionGroup
  permissionGroup: `${PREFIX_API_ADMID}/permission_groups`,

  // role_permission
  rolePermission: `${PREFIX_API_ADMID}/role_permission`,
  therolePermission: id => `${PREFIX_API_ADMID}/role_permission/${id}`,

  // advertise
  advertise: `${PREFIX_API_ADMID}/advertise/`,
  theAdvertise: id => `${PREFIX_API_ADMID}/advertise/${id}`,
  sortAdvertise: `${PREFIX_API_ADMID}/sort/advertise`,

  // material
  material: `${PREFIX_API_ADMID}/material`,
  theMaterial: id => `${PREFIX_API_ADMID}/material/${id}`,

  // advertiseMaterial
  advertiseMaterial: `${PREFIX_API_ADMID}/advertise_material`,
  theadvertiseMaterial: id => `${PREFIX_API_ADMID}/advertise_material/${id}`,
  sortadvertiseMaterial: `${PREFIX_API_ADMID}/sort/advertise_material`,
};
