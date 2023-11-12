import PropTypes from "prop-types";

MessageComp.propTypes = {
    data: PropTypes.object
}

export default function MessageComp({data}) {
    return (
        <div className={"p-3 border mb-2 rounded-lg bg-gray-300 border"}>
            <span className={"font-bold"}>{data.id}</span>. {data.message}
            <hr className={"mt-1 border-gray-500"}/>
            <div className={"flex md:flex-row flex-col md:items-center mt-2"}>
                <div className={"text-sm text-gray-600 grow"}>{data.useragent}</div>
                <div className={"text-xs text-gray-600/60 md:text-gray-600 mt-2 md:mt-0 font-medium md:font-normal"}>{localTime(data.created_at)}</div>
            </div>
        </div>
    )
}

function localTime(date) {
    let d = new Date(date)
    return d.toLocaleString()
}