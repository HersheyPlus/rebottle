import ReportItem from '../components/ReportItem'

const ReportList = () => {
  return (
    <section id='report-admin-' className='section-container'>
    <h1 className='text-3xl font-semibold mt-5 mb-10'>Report Received</h1>
    <div className='grid grid-cols-4 gap-x-8 gap-y-12'>
        <ReportItem />
        <ReportItem />
        <ReportItem />
        <ReportItem />
        <ReportItem />
        <ReportItem />
        <ReportItem />
        <ReportItem />
    </div>
</section>
  )
}

export default ReportList