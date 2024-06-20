const { SortingCategoryType } = require("../enums");

const buildQuery = (customerIds, sortParams) => {
  const mainQuery = `
    WITH FirstAddress AS (
    SELECT 
        a.customer_id,
        a.address_line_1,
        a.address_line_2,
        a.postal_code,
        co.country_name,
        s.state_name,
        c.city_name,
        ROW_NUMBER() OVER (PARTITION BY a.customer_id ORDER BY a.customer_id) AS rn
    FROM 
        addresses a
    LEFT JOIN 
        countries co ON a.country_id = co.id
    LEFT JOIN 
        states s ON a.state_id = s.id
    LEFT JOIN
        cities c ON a.city_id = c.id
    ),
    FirstPhoneNumber AS (
    SELECT 
        cp.customer_id,
        cp.phone_number,
        ROW_NUMBER() OVER (PARTITION BY cp.customer_id ORDER BY cp.customer_id) AS rn
    FROM 
        customer_phone_numbers cp
    )
    SELECT 
    DISTINCT c.id AS customer_id,
    c.name AS customer_name,
    c.email,
    c.priority,
    c.description,
    c.follow_up_date,
    c.website,
    c.status,
    c.lead_source,
    fa.country_name,
    fa.state_name,
    fa.city_name,
    fa.address_line_1,
    fa.address_line_2,
    fa.postal_code,
    fp.phone_number
    FROM 
    customers c
    LEFT JOIN 
    FirstAddress fa ON c.id = fa.customer_id AND fa.rn = 1
    LEFT JOIN 
    FirstPhoneNumber fp ON c.id = fp.customer_id AND fp.rn = 1
    WHERE 
    c.id IN (${customerIds})
    ORDER BY `;

  const populatedQuery = _populateQuery(mainQuery, sortParams);

  const finalQuery = populatedQuery.slice(0, -2) + ";";

  return finalQuery;
};

const _populateQuery = (query, sortParams) => {
  const keys = Object.keys(sortParams);

  keys.sort();
  for (let key of keys) {
    const category = sortParams[key].category;

    if (sortParams[key] === "selectedOption") continue;

    switch (category) {
      case SortingCategoryType.NAME:
        query += `c.name ${
          sortParams[key].selectedOption === "Ascending" ? "ASC" : "DESC"
        }, `;
        break;
      case SortingCategoryType.DATE:
        query += `c.follow_up_date ${
          sortParams[key].selectedOption === "Ascending" ? "ASC" : "DESC"
        }, `;
        break;
      case SortingCategoryType.STATUS:
        query += `c.status ${
          sortParams[key].selectedOption === "Ascending" ? "ASC" : "DESC"
        }, `;
        break;
      case SortingCategoryType.SERVICE:
        query += `c.service ${
          sortParams[key].selectedOption === "Ascending" ? "ASC" : "DESC"
        }, `;
        break;
      case SortingCategoryType.LEAD_SOURCE:
        query += `c.lead_source ${
          sortParams[key].selectedOption === "Ascending" ? "ASC" : "DESC"
        }, `;
        break;
      case SortingCategoryType.PHONE_NUMBER:
        query += `fp.phone_number ${
          sortParams[key].selectedOption === "Ascending" ? "ASC" : "DESC"
        }, `;
        break;
      case SortingCategoryType.EMAIL:
        query += `c.email ${
          sortParams[key].selectedOption === "Ascending" ? "ASC" : "DESC"
        }, `;
        break;
      case SortingCategoryType.CITY:
        query += `fa.city_name ${
          sortParams[key].selectedOption === "Ascending" ? "ASC" : "DESC"
        }, `;
        break;
      case SortingCategoryType.STATE:
        query += `fa.state_name ${
          sortParams[key].selectedOption === "Ascending" ? "ASC" : "DESC"
        }, `;
        break;
      case SortingCategoryType.ZIP_CODE:
        query += `fa.postal_code ${
          sortParams[key].selectedOption === "Ascending" ? "ASC" : "DESC"
        }, `;
        break;
      case SortingCategoryType.COUNTRY:
        query += `fa.country_name ${
          sortParams[key].selectedOption === "Ascending" ? "ASC" : "DESC"
        }, `;
        break;
      default:
        break;
    }
  }
  return query;
};

module.exports = {
  buildQuery,
};
