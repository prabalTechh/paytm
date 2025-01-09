/* eslint-disable react/prop-types */

const Balance = ({balance}) => {
  return (
    <div className="text-2xl">
     <h1 className="font-bold"> Your balance <span className="font-normal">{balance}</span></h1>
    </div>
  )
}

export default Balance
