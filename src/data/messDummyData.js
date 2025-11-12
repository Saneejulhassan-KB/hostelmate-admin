export const messDummyData ={
    "count": 2,
    "next": null,
    "previous": null,
    "results": [
      {
        "id": 1,
        "name": "Delicious Home Mess",
        "address": "123 Food Street",
        "city": "Pune",
        "state": "Maharashtra",
        "pincode": "411001",
        "description": "Healthy homemade food served daily.",
        "latitude": "18.5204",
        "longitude": "73.8567",
        "created_at": "2025-11-10T10:30:00Z",
        "is_verified": true,
        "mess_menus": [
          {
            "id": 1,
            "day": "Monday",
            "veg_menu": {
              "breakfast": "Poha & Tea",
              "breakfast_accompaniment": "Banana",
              "lunch": "Dal, Rice, Roti, Bhindi Fry",
              "lunch_accompaniment": "Salad",
              "dinner": "Paneer Butter Masala & Jeera Rice",
              "dinner_accompaniment": "Curd"
            },
            "nonveg_menu": {
              "breakfast": "Egg Bhurji & Bread",
              "breakfast_accompaniment": "Juice",
              "lunch": "Chicken Curry & Rice",
              "lunch_accompaniment": "Pickle",
              "dinner": "Fish Fry & Roti",
              "dinner_accompaniment": "Salad"
            },
            "images": {
              "breakfast_image": "https://example.com/images/poha.jpg",
              "lunch_image": "https://example.com/images/lunch.jpg",
              "dinner_image": "https://example.com/images/dinner.jpg"
            },
            "created_at": "2025-11-09T08:00:00Z"
          }
        ],
        "meal_plans": [
          {
            "id": 1,
            "plan_id": "MP001",
            "name": "Weekly Veg Plan",
            "price": "899.00",
            "meals": 21,
            "features": ["Breakfast", "Lunch", "Dinner"],
            "provider_type": "mess",
            "provider_name": "Delicious Home Mess"
          },
          {
            "id": 2,
            "plan_id": "MP002",
            "name": "Non-Veg Deluxe Plan",
            "price": "1199.00",
            "meals": 21,
            "features": ["Non-Veg Lunch", "Dinner"],
            "provider_type": "mess",
            "provider_name": "Delicious Home Mess"
          }
        ],
        "features": [
          {
            "id": 1,
            "icon": "https://example.com/icons/hygiene.png",
            "title": "Hygienic Kitchen",
            "description": "We maintain top hygiene standards.",
            "provider_type": "mess",
            "provider_name": "Delicious Home Mess"
          },
          {
            "id": 2,
            "icon": "https://example.com/icons/delivery.png",
            "title": "Fast Delivery",
            "description": "On-time delivery guaranteed.",
            "provider_type": "mess",
            "provider_name": "Delicious Home Mess"
          }
        ],
        "delivery_areas": [
          {
            "id": 1,
            "area_name": "Kothrud",
            "provider_type": "mess",
            "provider_name": "Delicious Home Mess"
          },
          {
            "id": 2,
            "area_name": "Baner",
            "provider_type": "mess",
            "provider_name": "Delicious Home Mess"
          }
        ]
      },
      {
        "id": 2,
        "name": "Tasty Tiffins",
        "address": "45 Meal Road",
        "city": "Mumbai",
        "state": "Maharashtra",
        "pincode": "400001",
        "description": "Affordable tiffins for students and working professionals.",
        "latitude": "19.0760",
        "longitude": "72.8777",
        "created_at": "2025-11-08T09:00:00Z",
        "is_verified": false,
        "mess_menus": [
          {
            "id": 2,
            "day": "Tuesday",
            "veg_menu": {
              "breakfast": "Upma & Tea",
              "breakfast_accompaniment": "Apple",
              "lunch": "Rajma Chawal",
              "lunch_accompaniment": "Papad",
              "dinner": "Aloo Gobi & Chapati",
              "dinner_accompaniment": "Curd"
            },
            "nonveg_menu": null,
            "images": {
              "breakfast_image": "https://example.com/images/upma.jpg",
              "lunch_image": "https://example.com/images/rajma.jpg",
              "dinner_image": "https://example.com/images/aloo_gobi.jpg"
            },
            "created_at": "2025-11-07T07:00:00Z"
          }
        ],
        "meal_plans": [
          {
            "id": 3,
            "plan_id": "MP003",
            "name": "Monthly Veg Plan",
            "price": "2499.00",
            "meals": 90,
            "features": ["Lunch", "Dinner"],
            "provider_type": "mess",
            "provider_name": "Tasty Tiffins"
          }
        ],
        "features": [
          {
            "id": 3,
            "icon": "https://example.com/icons/fresh.png",
            "title": "Fresh Ingredients",
            "description": "Daily fresh vegetables used.",
            "provider_type": "mess",
            "provider_name": "Tasty Tiffins"
          }
        ],
        "delivery_areas": [
          {
            "id": 3,
            "area_name": "Andheri",
            "provider_type": "mess",
            "provider_name": "Tasty Tiffins"
          },
          {
            "id": 4,
            "area_name": "Bandra",
            "provider_type": "mess",
            "provider_name": "Tasty Tiffins"
          }
        ]
      }
    ]
  }
  