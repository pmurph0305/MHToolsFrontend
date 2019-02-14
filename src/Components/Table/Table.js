import React from 'react';

/**
 * Table creates a tachyon styled table.
 * Headers are displayed at the top of the table
 * Columns are arrays and contain the data displayed in the columns in order.
 * columns[0][0] columns[1][0] and columns[2][0] will be in the same row.
 * Will only display a number of rows up to the shortest non-null column length.
 * @headers Headers of the table.
 * @columns Array of arrays of data in columns for the table.
 * @footers Footers of the table, in a row.
 * @txClass Every txClass is the className for the tx element.
 */
const Table = ({headers, columns, footers, tdClass, thClass, tClass, trClass, tfClass}) => {

    //calculates shortest column to make sure we don't
    // go over it when we map in the return.
    if (columns) {
        var shortestColumn;
        columns.forEach((column,index) => {
            if (column != null) {
                if (!shortestColumn) { shortestColumn = index}
                shortestColumn = column.length < columns[shortestColumn].length 
                    ? index 
                    : shortestColumn;
            }
        })
    }
    return(
        <table className={tClass} cellSpacing="0">
            {headers ?
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
            : null
            }
            <tbody>
                {columns && columns[shortestColumn] ?
                    columns[shortestColumn].map((indexColumn, index) => {
                    return (
                        <tr className={trClass} key={index}>
                            {columns.map((column,i) => {
                                if (column) {
                                return (
                                    <td className={tdClass}
                                        key={index+i}
                                    >{column[index]}</td>
                                )
                                } else { return null }
                            })}
                        </tr>
                    )
                })
                : null
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