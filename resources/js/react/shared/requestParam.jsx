import { Filters } from "../constants";

export default (
    filters = Filters.OBJ,
    admin,
    stockReport,
    isProductQuantity,
    baseUrl = "?"
) => {
    let url = baseUrl.indexOf("?") > 0 ? "" : "?";

    if (filters.order_By !== "") {
        if (baseUrl.indexOf("?") > 0 || (url.includes("?") && url.length > 1)) {
            url += "&";
        }
        if (filters.direction === "asc") {
            url = url + "sort=" + filters.order_By;
        } else if (filters.direction === "desc") {
            url = url + "sort=" + "-" + filters.order_By;
        }
    }
    if (filters.order_By === "") {
        if (isProductQuantity) {
        } else {
            if (
                baseUrl.indexOf("?") > 0 ||
                (url.includes("?") && url.length > 1)
            ) {
                url += "&";
            }
            url = url + "sort=" + "-" + filters.created_at;
        }
    }
    if (filters.pageSize > 0) {
        if (baseUrl.indexOf("?") > 0 || (url.includes("?") && url.length > 1)) {
            url += "&";
        }
        url = url + "page[size]=" + filters.pageSize;
    }
    if (filters.page > 0) {
        if (baseUrl.indexOf("?") > 0 || (url.includes("?") && url.length > 1)) {
            url += "&";
        }
        url = url + "page[number]=" + filters.page;
    }
    if (filters.search !== "") {
        if (baseUrl.indexOf("?") > 0 || (url.includes("?") && url.length > 1)) {
            url += "&";
        }
        url += "filter[search]=" + filters.search;
    }
    if (stockReport) {
        if (filters.search !== "") {
            if (
                baseUrl.indexOf("?") > 0 ||
                (url.includes("?") && url.length > 1)
            ) {
                url += "&";
            }
            url += "search=" + filters.search;
        }
    }

    if (filters.start_date && filters.end_date) {
        if (baseUrl.indexOf("?") > 0 || (url.includes("?") && url.length > 1)) {
            url += "&";
        }
        url =
            url +
            "start_date=" +
            filters.start_date +
            "&end_date=" +
            filters.end_date;
    }

    if (filters.status || filters.payment_status || filters.payment_type) {
        if (baseUrl.indexOf("?") > 0 || (url.includes("?") && url.length > 1)) {
            url += "&";
        }
        url =
            url +
            "status=" +
            filters.status;
    }

    return url;
};
