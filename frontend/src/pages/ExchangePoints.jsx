import ExchangeItem from '../components/ExchangeItem'


const ExchangePoints = () => {
  return (
    <section id='exchange-points' className="section-container">
      <h1 className='text-3xl font-semibold mt-5 mb-10'>Items Exchange List:</h1>
      <div className='grid grid-cols-3 gap-x-8 gap-y-12'>
        <ExchangeItem rating={3} points={50000} type={"Toys"} />
        <ExchangeItem rating={2} points={20000} type={"Electronic"}/>
        <ExchangeItem rating={2} points={1000} type={"Gaming"}/>
        <ExchangeItem rating={4} points={100}type={"Gaming"}/>
        <ExchangeItem rating={5} points={9000}type={"Gaming"}/>
        <ExchangeItem rating={5} points={4000}type={"Payments"}/>
        </div>

    </section>
  )
}

export default ExchangePoints