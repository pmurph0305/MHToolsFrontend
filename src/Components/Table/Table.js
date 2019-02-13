import React from 'react';


const Table = ({headers, columns}) => {
    console.log(columns[0])
    return(
        <table className="f6 ma2 pa2 w-100 mw8 center" cellSpacing="0">
            <thead>
                <tr className="stripe-dark">
                    {headers.map((header, index)=> {
                        return (
                            <th className="fw6 tl pa3 bg-white"
                                key={index}
                            >{header}</th>
                        )
                    })}
                </tr>
            </thead>
            <tbody className="lh-copy">
                {columns[0].map((column, index) =>{
                    console.log(columns[0][index])
                    return (
                        <tr className="stripe-dark" key={index}>
                            <td className="pa3 tl">{index+1}.  {column}</td>
                            <td className="pa3">{columns[1][index]}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default Table;