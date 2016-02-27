import PublicationUtils from 'meteor/utilities:smart-publications';

Posts.addField(
  {
    fieldName: 'categories',
    fieldSchema: {
      type: [String],
      control: "checkboxgroup",
      optional: true,
      editableBy: ["member", "admin"],
      autoform: {
        noselect: true,
        type: "bootstrap-category",
        order: 50,
        options: function () {
          var categories = Categories.find().map(function (category) {
            return {
              value: category._id,
              label: category.name
            };
          });
          return categories;
        }
      },
      join: {
        joinAs: "categoriesArray",
        collection: () => Categories
      }
    }
  }
);

PublicationUtils.addToFields(Posts.publishedFields.list, ["categories"]);
PublicationUtils.addToFields(Posts.publishedFields.single, ["categories"]);