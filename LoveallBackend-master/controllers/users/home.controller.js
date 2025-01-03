import { Store, Offers } from "../../models/association.js";

const home = async (req, res, next) => {
  try {
    const { brand_limit = 10, offer_limit = 10, featured_limit = 10 } = req.body;
    const brand = await Store.findAll({
      attributes: ['store_id', 'category_id', 'category', 'store_name', 'address', 'rating', 'logo'],
      limit: brand_limit
    });

    // Modify the logo paths
    const modifiedBrand = brand.map(store => ({
      ...store.toJSON(),
      logo: store.logo || 'default-logo.png' // Use a default logo if none is provided
    }));

    const offers = await Offers.findAll({
      where: { status: 'active' },
      attributes: ['offer_id', 'store_id', 'featured', 'offer_type', 'description', 'discount_percentage', 'minimum_purchase', 'maximum_discount', 'start_date', 'end_date', 'terms_conditions', 'number_of_uses', 'limit_per_customer'],
      include: [{
        model: Store,
        attributes: ['store_id', 'store_name', 'logo']
      }],
      order: [['discount_percentage', 'DESC']],
      limit: offer_limit
    });

    const featureOffers = await Offers.findAll({
      where: { status: 'active', featured: 1 },
      attributes: ['offer_id', 'store_id', 'offer_type', 'description', 'discount_percentage', 'minimum_purchase', 'maximum_discount', 'start_date', 'end_date', 'terms_conditions', 'number_of_uses', 'limit_per_customer'],
      include: [{
        model: Store,
        attributes: ['store_id', 'store_name', 'logo']
      }],
      order: [['discount_percentage', 'DESC']],
      limit: featured_limit
    });

    return res.status(200).json({ 
      success: true, 
      data: { 
        brand: modifiedBrand, 
        offers, 
        featureOffers 
      }, 
      limit: { brand_limit, offer_limit, featured_limit }, 
      error: null 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, data: { brand: null, offers: null, featureOffers: null }, error: "Internal Server Error" });
  }
};

const getRecommendedBrands = async (req, res, next) => {
  try {
    const { store_id, page = 1, limit = 10 } = req.body;
    const offset = (page - 1) * limit;

    const { count, rows: offers } = await Offers.findAndCountAll({
      where: { store_id, status: 'active' },
      attributes: ['offer_id', 'store_id', 'offer_type', 'description', 'discount_percentage', 'minimum_purchase', 'maximum_discount', 'start_date', 'end_date', 'terms_conditions', 'number_of_uses', 'limit_per_customer'],
      include: [{
        model: Store,
        attributes: ['store_id', 'store_name', 'logo']
      }],
      order: [['discount_percentage', 'DESC']],
      limit,
      offset,
    });

    const totalPages = Math.ceil(count / limit);

    return res.status(200).json({ 
      success: true, 
      data: offers,
      pagination: {
        totalItems: count,
        totalPages,
        currentPage: page,
        limit
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export { home, getRecommendedBrands };

