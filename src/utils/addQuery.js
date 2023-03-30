const addQuery = async (key, value) => {
  const query = { ...route.query }
  query[key] = value
  await router.push({ query })
  loadData()
}

export default addQuery;