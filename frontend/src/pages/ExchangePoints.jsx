import ExchangeItem from '../components/ExchangeItem'


const ExchangePoints = () => {
  return (
    <section id='exchange-points' className="section-container">
      <h1 className='text-3xl font-semibold mt-5 mb-10'>Items Exchange List:</h1>
      <div className='grid grid-cols-3 gap-x-8 gap-y-12'>
        <ExchangeItem rating={3} />
        <ExchangeItem rating={2} />
        <ExchangeItem rating={2} />
        <ExchangeItem rating={4} />
        <ExchangeItem rating={5} />
        <ExchangeItem rating={5} />
        <ExchangeItem rating={1} />
        <ExchangeItem rating={4} />
        <ExchangeItem rating={4} />
        <ExchangeItem rating={1} />
        </div>

    </section>
  )
}

export default ExchangePoints