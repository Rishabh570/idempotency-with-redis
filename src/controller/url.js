const { HTTP_STATUS_CODES } = require('../../constants');

module.exports = ({ service }) => {
  async function create(req, res) {
    let lock;
    try {
      // Try to acquire the lock
      lock = await service.urlService.acquireLock('URL:CREATE:ExclusiveLock', 100);

      const { longURL } = req.body;
  
      // Check if the mapping already exists
      const mapping = await service.urlService.findByLongURL(longURL);
      if (mapping) {
        return res.status(HTTP_STATUS_CODES.SUCCESS).json({
          status: true,
          message: 'Short slug created successfully',
          data: { slug: mapping.slug },
        });
      }
  
      // New long URL, generate a new and unique slug
      const slug = service.urlService.generateNewSlug();
  
      // save short URL <> long URL mapping to the database
      await service.urlService.saveToDB(slug, longURL);

      // Return the newly generated short slug
      return res.status(HTTP_STATUS_CODES.SUCCESS).json({
        status: true,
        message: 'Short slug created successfully',
        data: { slug },
      });
    } catch (err) {
      return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: 'Could not create short slug',
        error: err,
      });
    } finally {
      /**
       * Manually release the lock when the operation is complete
       * 
       * Redlock release is not a no-op, it throws error if you try to release an already expired lock
       * Ignore the errors from release method
       */
      if (lock) await lock.release().catch(() => {});
    }
  }
  
  async function get(req, res) {
    try {
      const { slug } = req.params;
  
      // Check if the mapping already exists
      const mapping = await service.urlService.findBySlug(slug);
      if (!mapping) {
        throw new Error('No mapping found for given slug');
      }
  
      return res.status(HTTP_STATUS_CODES.REDIRECT).redirect(mapping.longURL);
    } catch (err) {
      return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: 'Failed to redirect',
        error: err,
      });
    }
  }

  return {
    create,
    get,
  }
};
