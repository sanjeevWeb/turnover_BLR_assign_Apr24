require('dotenv').config();

const cors = require('cors');
const express = require('express');

// grabbing models/tables
const User = require('./models/user.model.js');
const CheckedProduct = require('./models/chkProduct.model.js');
const UserChkProduct = require('./models/chkProduct.model.js');
const sequelize  = require('./database/db.js');

//routes
const router = require('./routes/user.route.js');
const verifyRouter = require('./routes/verifyemail.route.js');
const productRoute = require('./routes/product.route.js');

const app = express();
const PORT = process.env.PORT || 5000;

//general(parsing) middleware
app.use(cors({
    origin: 'https://turnover-blr-assign-apr24-4lsd-frontend.vercel.app',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// relationship among tables, UserChkProduct is a join table for m-n relation
User.belongsToMany(CheckedProduct, { through: UserChkProduct, foreignKey: 'user_id' });
CheckedProduct.belongsToMany(User, { through: UserChkProduct, foreignKey: 'product_id' });

//route middlewares
app.use('/api/v1', router);
app.use('/api/v1', verifyRouter);
app.use('/api/v1', productRoute);

sequelize.sync({ force: false })
    .then(() => {
        console.log('tables created successfully');
    })
    .catch(err => {
        console.log(err);
    });

app.listen(PORT, () => {
    console.log(`app running at port ${PORT}`);
});
