function ChartsServices($resource) {
  return $resource('/charts/:id.json', { id:'@id' }, {
    'query' : { method:'GET', isArray: false }
  });
};

Biohacking.factory('ChartsServices', ['$resource', ChartsServices]);