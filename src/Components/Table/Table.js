import React from 'react';

/**
 * Table creates a tachyon styled table.
 * Headers are displayed at the top of the table
 * Columns are arrays and contain the data displayed in the columns in order.
 * columns[0][0] columns[1][0] and columns[2][0] will be in the same row.
 * Will only display a number of rows up to the shortest non-null column length.
 * @headers Headers of the table.
 * @rows Array of data in rows, ideally same number of columns as headers.
 * @footers Footers of the table, ideally same number of columns as headers.
 * @txClass Every txClass is the className for the tx element.
 */
const Table = ({headers, rows, footers, tdClass, thClass, tClass, trClass, tfClass}) => {
    //calculates shortest column to make sure we don't
    // go over it when we map in the return.
    return (
        <table className={tClass} cellSpacing="0">
            {Array.isArray(headers) ?
                <thead>
                    <tr className={trClass}>
                        {headers.map((header, index)=> {
                            return (
                                <th className={thClass}
                                    key={index}
                                >{header}</th>
                            )
                        })}
                    </tr>
                </thead>
            :   <thead>
                    <tr className={trClass}>
                        <th className={thClass}>
                            {headers}
                        </th>
                    </tr>
                </thead>
            }
            <tbody>
                {Array.isArray(rows) 
                ? rows.map((row, rowi) => {
                    return(
                        <tr className={trClass} key={rowi}>
                            {Array.isArray(row)
                            ? row.map((ele, i) => {
                                return(
                                    <td className={tdClass} key={rowi+i}>
                                        {ele}
                                    </td>
                                )
                            })
                            :   <tr className={trClass}>
                                    <td className={tdClass}>
                                        {row}
                                    </td>
                                </tr>
                            }
                        </tr>
                    )
                })
                :   <tr className={trClass}>
                        <td className={tdClass}>
                            {rows}
                        </td>
                    </tr>
                }
            </tbody>
            {footers ?
                <tfoot>
                    <tr className={trClass}>
                        {footers.map((footer, index)=> {
                            return (
                                <td className={tfClass}
                                    key={index}
                                >{footer}</td>
                            )
                        })}
                    </tr>
                </tfoot>
            : null
            }
        </table>
    )
}

export default Table;