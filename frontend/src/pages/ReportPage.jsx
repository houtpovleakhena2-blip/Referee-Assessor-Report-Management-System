import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import reportLogo from '../assets/image.png'

const competitions = ['WCL', 'CPL', 'U16', 'Futsal']

const reports = [
  { id: 'RPT-1001', competition: 'WCL', match: 'Phnom Penh Crown vs Visakha', assessor: 'Kim Sopheak', status: 'Submitted', score: 91 },
  { id: 'RPT-1002', competition: 'CPL', match: 'Boeung Ket vs NagaWorld', assessor: 'Heng Piseth', status: 'Review', score: 86 },
  { id: 'RPT-1003', competition: 'U16', match: 'Tiffy Army vs Kirivong', assessor: 'Meas Panha', status: 'Draft', score: 83 },
  { id: 'RPT-1004', competition: 'WCL', match: 'Cambodia vs Thailand', assessor: 'Srey Rotha', status: 'Submitted', score: 89 },
  { id: 'RPT-1005', competition: 'Futsal', match: 'Blue Dragon vs Tiger FC', assessor: 'Long Vicheka', status: 'Draft', score: 84 },
]

const ratingScale = [
  ['៩.០ - ១០', 'ការអនុវត្តនៅក្នុងការប្រកួតបានល្អណាស់ដោយមានការសម្រេចចិត្តលំបាកៗជាច្រើនធ្វើការសម្រេចចិត្តបានយ៉ាងត្រឹមត្រូវ'],
  ['៨.៥ - ៨.៩', 'ការអនុវត្តនៅក្នុងការប្រកួតបានល្អណាស់ដោយមានការសម្រេចចិត្តលំបាកបីបួនបានធ្វើការសម្រេចចិត្តបានយ៉ាងត្រឹមត្រូវ។'],
  ['៨.០ - ៨.៤', 'ការអនុវត្តនៅក្នុងការប្រកួតបានល្អដោយការសម្រេចចិត្តដែលរំពឹងទុកជាច្រើនធ្វើបានយ៉ាងត្រឹមត្រូវ។'],
  ['៨.០ - ៨.២', 'ការអនុវត្តនៅក្នុងការប្រកួតបានល្អដោយការសម្រេចចិត្តដែលរំពឹងទុកពីរបីធ្វើបានយ៉ាងត្រឹមត្រូវ និងមានពីរបីចំណុចត្រូវការអភិវឌ្ឍបន្ថែម។'],
  ['7.9', 'មិនពេញចិត្តចំពោះការអនុវត្តនៅក្នុងការប្រកួតដោយមានឧប្បត្តិហេតុដ៏សំខាន់មួយធ្វើការសម្រេចចិត្តមិនបានត្រឹមត្រូវ។'],
  ['7.8', 'មិនពេញចិត្តចំពោះការអនុវត្តនៅក្នុងការប្រកួតដោយមានឧប្បត្តិហេតុដ៏សំខាន់មួយធ្វើការសម្រេចចិត្តមិនបានត្រឹមត្រូវ និងមានពីរបីចំណុចត្រូវការអភិវឌ្ឍបន្ថែម។'],
  ['៧.៥ - ៧.៧', 'មិនពេញចិត្តចំពោះការអនុវត្តនៅក្នុងការប្រកួតដោយមានឧប្បត្តិហេតុដ៏សំខាន់ពីរធ្វើការសម្រេចចិត្តមិនបានត្រឹមត្រូវ និងមានពីរបីចំណុចត្រូវការអភិវឌ្ឍបន្ថែម។'],
  ['7.4', 'ឧប្បត្តិហេតុដ៏សំខាន់មួយដែលជះឥទ្ធិពលដល់អ្នកឈ្នះនៃការប្រកួតដែលធ្វើការសម្រេចចិត្តមិនបានត្រឹមត្រូវ។'],
  ['៧.០ - ៧.៤', 'ការអនុវត្តខ្សោយដោយឧប្បត្តិហេតុដ៏សំខាន់បី ឬច្រើនធ្វើការសម្រេចចិត្តមិនបានត្រឹមត្រូវ និងមានចំណុចជាច្រើនត្រូវការអភិវឌ្ឍបន្ថែម។'],
]

const ratingDefinitions = [
  ['ការអនុវត្តល្អណាស់', 'លើសការរំពឹងទុកជាអាជ្ញាកណ្តាលកម្រិតខ្ពស់ AFC។ ការអនុវត្តដ៏ល្អ និងការសម្រេចចិត្តដ៏លំបាកៗជាច្រើនធ្វើការសម្រេចចិត្តបានយ៉ាងត្រឹមត្រូវ។'],
  ['ការអនុវត្តល្អ', 'ឈានដល់ការរំពឹងទុកជាអាជ្ញាកណ្តាលកម្រិតខ្ពស់ AFC។ ដ៏ល្អ និងពោរពេញដោយសមត្ថភាព។'],
  ['មិនពេញចិត្តការអនុវត្ត', 'ក្រោមការរំពឹងទុកជាអាជ្ញាកណ្តាលកម្រិតខ្ពស់ AFC។ ត្រូវការអភិវឌ្ឍបន្ថែម។'],
  ['ខ្សោយការអនុវត្ត', 'ក្រោមការរំពឹងទុកជាអប្បបរមាជាអាជ្ញាកណ្តាលកម្រិតខ្ពស់ AFC។ ការអនុវត្តមិនអាចទទួលយកបាន។ ត្រូវការអភិវឌ្ឍបន្ថែមភ្លាមៗ។'],
  ['ការសម្រេចចិត្តដែលរំពឹងទុក', 'ការសម្រេចចិត្តងាយស្រួល/ធម្មតាដែលអាជ្ញាកណ្តាលគួរតែធ្វើបានយ៉ាងត្រឹមត្រូវ។'],
  ['ការសម្រេចចិត្តដែលលំបាក/សំខាន់', 'ការសម្រេចចិត្តដែលត្រូវការអត់ទ្រាំមានលក្ខណៈប្រជែង/សាកល្បងអាជ្ញាកណ្តាល។'],
  ['ការសម្រេចចិត្តលំបាកៗជាច្រើន', 'ការសម្រេចចិត្តប្រាំ ឬច្រើន។'],
  ['ការសម្រេចចិត្តលំបាកៗពីរបី', 'ការសម្រេចចិត្តតិចជាងប្រាំ។'],
  ['ឧប្បត្តិហេតុការប្រកួតដ៏សំខាន់', 'ឧប្បត្តិហេតុដែលអាចបណ្តាលឱ្យបាល់ចូលទី ឬមិនចូលទី និងកំហុសបណ្តេញចេញ។'],
]

const  assessmentSections = [
  {
    code: 'B',
    title: 'វាយតម្លៃអាជ្ញាកណ្តាល',
    groups: [
      {
        number: '1',
        title: 'គ្រប់គ្រងការប្រកួត',
        descriptions: [
          'ការបកប្រែ និងការអនុវត្តច្បាប់កីឡាបាល់ទាត់បានត្រឹមត្រូវ និងមិនប្រែប្រួល',
          'ការដាក់ទណ្ឌកម្មបានត្រឹមត្រូវ វិធីសាស្ត្រដោះស្រាយ បុគ្គលិកលក្ខណៈ និងការគ្រប់គ្រងប្រកួត។',
        ],
      },
      {
        number: '2',
        title: 'កម្លាំងកាយ',
        descriptions: [
          'អំណត់ ល្បឿន និងការបង្កើនល្បឿននៅពេលចាំបាច់',
          'ជំហរ និងចលនា',
        ],
      },
      {
        number: '3',
        title: 'ការងារក្រុម',
        descriptions: [
          'សហការណ៍ជាមួយជំនួយការអាជ្ញាកណ្តាល និងមន្ត្រីទី៤',
        ],
      },
    ],
  },
  {
    code: 'C',
    title: 'វាយតម្លៃជំនួយការអាជ្ញាកណ្តាលទី១',
    groups: [
      {
        number: '1',
        title: 'ការសម្រេចចិត្ត និងសញ្ញាបានត្រឹមត្រូវ',
        descriptions: [
          'ស្ថានភាពអហ្វសាយ បោះបាល់ចូលក្នុងទីលាន ទាត់បាល់ចេញពីផ្ទៃទី ។ល។',
          'បច្ចេកទេសទង់ ជំហរ និងចលនា',
        ],
      },
    ],
  },
  {
    code: 'D',
    title: 'វាយតម្លៃជំនួយការអាជ្ញាកណ្តាលទី២',
    groups: [
      {
        number: '1',
        title: 'ការសម្រេចចិត្ត និងសញ្ញាបានត្រឹមត្រូវ',
        descriptions: [
          'ស្ថានភាពអហ្វសាយ បោះបាល់ចូលក្នុងទីលាន ទាត់បាល់ចេញពីផ្ទៃទី ។ល។',
          'បច្ចេកទេសទង់ ជំហរ និងចលនា',
        ],
      },
    ],
  },
  {
    code: 'E',
    title: 'វាយតម្លៃមន្ត្រីទី៤',
    groups: [
      {
        number: '1',
        title: 'ការសហការណ៍ និងគ្រប់គ្រងតំបន់បច្ចេកទេស',
        descriptions: [
          'សហការណ៍ជាមួយអាជ្ញាកណ្តាល និងជំនួយការអាជ្ញាកណ្តាលទាំងពីរ',
          'គ្រប់គ្រងតំបន់បច្ចេកទេស',
        ],
      },
    ],
  },
]

function FeedbackRows({ title }) {
  return (
    <div className="feedback-block">
      <div className="feedback-heading">
        <strong>{title}</strong>
        <span className="feedback-minutes-heading">នាទី</span>
      </div>
      {[1, 2, 3].map((number) => (
        <div className="feedback-row" key={`${title}-${number}`}>
          <span className="feedback-number">{number}</span>
          <textarea rows="2" placeholder={title} />
          <input placeholder="នាទី" />
        </div>
      ))}
    </div>
  )
}

function U16ReportTemplate() {
  return (
    <div className="u16-template">
      {/* header */}
      <div className="report-front-sheet">
        <div className="report-cover-header">
        <img className="report-crest" src={reportLogo} alt="FFC" />
        <div className="report-cover-title">
          <strong>របាយការណ៍</strong>
          <strong>អ្នកវាយតម្លៃអាជ្ញាកណ្តាល</strong>
          <h2>REFEREE ASSESSOR REPORT</h2>
        </div>
        </div>
        <label className="report-match-number">
          <span>លេខប្រកួត</span>
          <input placeholder="Match No." />
        </label>

      <section className="template-card report-info-card">
        <h3>A. ពិពណ៌នា និងព័ត៌មានការប្រកួត</h3>
        <div className="template-fields">
          <label><span>ពិពណ៌នាពីការប្រកួត/ពានរង្វាន់</span><input defaultValue="Cambodia Youth League U16" /></label> <br />
          <label><span>ក្រុម ក</span><input /></label>
          <label><span>ក្រុម ខ</span><input /></label>
          <label><span>កីឡដ្ឋាន</span><input /></label>
          <label><span>កាលបរិច្ឆេទ</span><input type="date" /></label>
          <label><span>ម៉ោង</span><input type="time" /></label>
        </div>
      </section>

      <section className="template-card report-info-card">
        <h3>2. មន្ត្រីការប្រកួត</h3>
        <div className="official-table">
          <span>តួនាទី</span>
          <span>ឈ្មោះ</span>
          <span>ភាពលំបាក</span>
          <span>ពិន្ទុ</span>
          {['អាជ្ញាកណ្តាល', 'ជំនួយការអាជ្ញាកណ្តាលទី១', 'ជំនួយការអាជ្ញាកណ្តាលទី២', 'មន្ត្រីទី៤'].map((role) => (
            <div className="official-row" key={role}>
              <strong>{role}</strong>
              <input placeholder="ឈ្មោះ" />
              <select defaultValue="">
                <option value="" disabled>ជ្រើសរើស</option>
                <option>កម្រិតខ្ពស់</option>
                <option>កម្រិតមធ្យម</option>
                <option>កម្រិតទាប</option>
              </select>
              <input placeholder="ពិន្ទុ" />
            </div>
          ))}
        </div>
        <label className="full-field">
          <span>អ្នកវាយតម្លៃអាជ្ញាកណ្តាល</span>
          <input />
        </label>
      </section>

      <section className="template-card report-info-card">
        <h3>3. លទ្ធផលការប្រកួត</h3>
        <div className="result-table">
          {['លទ្ធផលចន្លោះវគ្គ', 'លទ្ធផលបញ្ចប់វគ្គ', 'លទ្ធផលវគ្គបន្ថែមម៉ោង', 'ទាត់ពីចំណុចប៉េណាល់ទី'].map((label) => (
            <div className="result-row" key={label}>
              <span>{label}</span>
              <input placeholder="លទ្ធផល" />
              <span>ជ័យជំនះបានទៅលើ</span>
              <input placeholder="ក្រុម" />
            </div>
          ))}
        </div>
      </section>

      <section className="template-card report-info-card">
        <h3>4. ឧប្បត្តិហេតុការប្រកួតដ៏សំខាន់</h3>
        <div className="incident-table">
          <span>ឧប្បត្តិហេតុ</span>
          <span>មន្ត្រីការប្រកួត</span>
          <span>នាទី</span>
          {[1, 2, 3, 4, 5, 6].map((row) => (
            <div className="incident-row" key={`incident-${row}`}>
              <input placeholder="Penalty area / Sending off / Goal-No goal / Offside" />
              <input placeholder="មន្ត្រីការប្រកួត" />
              <input placeholder="នាទី" />
            </div>
          ))}
        </div>
      </section>

      <section className="template-card report-info-card">
        <h3>5. ជ្រើសរើសវីដេអូខ្លីសម្រាប់ជាឧទ្ទេសបង្រៀន</h3>
        <div className="incident-table">
          <span>ចំណុចវីដេអូ</span>
          <span>មន្ត្រីការប្រកួត</span>
          <span>នាទី</span>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((row) => (
            <div className="incident-row" key={`video-${row}`}>
              <input placeholder="ពិពណ៌នាវីដេអូ" />
              <input placeholder="មន្ត្រីការប្រកួត" />
              <input placeholder="នាទី" />
            </div>
          ))}
        </div>
      </section>

      <section className="template-card rating-reference-card">
        <h3>រង្វាស់នៃការវាយតម្លៃ</h3>
        <div className="rating-scale">
          {ratingScale.map(([score, text]) => (
            <div key={score}>
              <strong>{score}</strong>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="template-card definition-reference-card">
        <h3>ពិពណ៌នា</h3>
        <div className="definition-table">
          {ratingDefinitions.map(([title, text]) => (
            <div key={title}>
              <strong>{title}</strong>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </section>
      </div>
       {/* assessment */}
      {assessmentSections.map((section) => (
        <section
          className={section.code === 'B' ? 'assessment-sheet assessment-sheet-primary' : 'assessment-sheet'}
          key={section.code}
        >
          <h3>
            <span>{section.code}. {section.title}</span>
          </h3>
          {section.groups.map((group) => (
            <div className="assessment-group" key={`${section.code}-${group.number}`}>
              <div className="assessment-title">
                <strong>{group.number}</strong>
                <div>
                  <span>{group.title}</span>
                  {group.descriptions.map((description) => (
                    <p key={description}>{description}</p>
                  ))}
                </div>
              </div>
              <FeedbackRows title="ចំណុចវិជ្ជមាន" />
              <FeedbackRows title="ចំណុច និងដំបូន្មានសម្រាប់ការអភិវឌ្ឍ" />
            </div>
          ))}
        </section>
      ))}
      {/* footer */}
      <section className="report-footer-sheet">
        <div className="footer-note-row">
          <span className="footer-code">F</span>
          <strong>កំណត់សម្គាល់បន្ថែម ប្រសិនបើមាន</strong>
          <input placeholder="ការប្រកួតទាន់ពេលវេលា" />
        </div>
        <div className="footer-name-row">
          <span className="footer-code">G</span>
          <strong>ឈ្មោះអ្នកវាយតម្លៃ</strong>
          <input defaultValue="ហួត ពៅល្ខិណា" />
        </div>
        <label className="footer-signature-row">
          <span>ហត្ថលេខា</span>
          <textarea rows="3" />
        </label>
        <label className="footer-date-row">
          <span>កាលបរិច្ឆេទ</span>
          <input type="date" />
        </label>
      </section>
    </div>
  )
}

function ReportPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCompetition = searchParams.get('competition') || 'WCL'
  const [selectedCompetition, setSelectedCompetition] = useState(initialCompetition)
  const filteredReports = reports.filter((report) => report.competition === selectedCompetition)

  const handleCompetitionChange = (competition) => {
    setSelectedCompetition(competition)
    setSearchParams({ competition })
  }

  useEffect(() => {
    setSelectedCompetition(searchParams.get('competition') || 'WCL')
  }, [searchParams])

  return (
    <div className="page-stack">
      <div className="page-title">
        <div>
          <span>Assessment</span>
          <h1>Reports</h1>
        </div>
        <button className="primary-button" type="button">New Report</button>
      </div>

      <section className="panel">
        <div className="report-toolbar">
          <label className="select-field">
            <span>Competition</span>
            <select
              value={selectedCompetition}
              onChange={(event) => handleCompetitionChange(event.target.value)}
            >
              {competitions.map((competition) => (
                <option key={competition} value={competition}>
                  {competition}
                </option>
              ))}
            </select>
          </label>
        </div>

        {selectedCompetition === 'U16' ? <U16ReportTemplate /> : null}

        <div className="data-table">
          <div className="data-head">
            <span>Report</span>
            <span>Competition</span>
            <span>Match</span>
            <span>Assessor</span>
            <span>Score</span>
            <span>Status</span>
          </div>
          {filteredReports.map((report) => (
            <Link className="data-row report-link" to={`/reports/${report.id}`} key={report.id}>
              <strong>{report.id}</strong>
              <span>{report.competition}</span>
              <span>{report.match}</span>
              <span>{report.assessor}</span>
              <span>{report.score}</span>
              <span className="status-pill">{report.status}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ReportPage
