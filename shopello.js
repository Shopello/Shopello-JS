/**
 * 203 Shopping JavaScript Client
 *
 * @version 1
 * @author Karl Laurentius Roos <karl.roos@produktion203.se>
 */
var shopello = function(settings){
	// Create the object
	var object = {
		/**
		 * API Key
		 */
		apiKey: "",
		
		/**
		 * API endpoint
		 */
		apiEndpoint: "http://api.shopello.se/1/",
		
		/**
		 * Last offset
		 */
		lastOffset: 0,
		
		/**
		 * Last limit
		 */
		lastLimit: 0,
		
		/**
		 * Error
		 *
		 * @param object
		 * @param string
		 * @return void
		 */
		error: function(jqXHR, textStatus){
			if(console && console.log){
				console.log("ERROR: " + textStatus);
				console.log(jqXHR);
			}
		},
		
		/**
		 * Call
		 *
		 * @param string
		 * @param object
		 * @param object
		 * @param object
		 * @return void
		 */
		call: function(method, data, success, error){
			if(typeof error == "undefined"){
				error = this.error;
			}
			
			$.ajax({
				url:	  this.apiEndpoint + method + ".jsonp",
				data:	  data,
				dataType: "jsonp",
				type:	  "GET",
				success:  function(data){
					success(data.data);
				},
				error:	  error
			});
		},
		
		/**
		 * Products
		 *
		 * @param object
		 * @param object
		 * @param object
		 * @return void
		 */
		products: function(data, success, error){
			if(typeof data.limit !== "undefined"){
				this.lastLimit = data.limit;
			}
			
			if(typeof data.offset !== "undefined"){
				this.lastOffset = data.offset;
			}
			
			this.call("products", data, success, error);
		},
		
		/**
		 * Products next
		 *
		 * @param object
		 * @param object
		 * @return void
		 */
		productsNext: function(success, error){
			this.lastOffset = this.lastOffset + this.lastLimit;
			
			this.call("products", {
				limit: this.lastLimit,
				offset: this.lastOffset
			}, success, error);
		},
		
		/**
		 * Products prev
		 *
		 * @param object
		 * @param object
		 * @return void
		 */
		productsPrev: function(success, error){
			this.lastOffset = this.lastOffset - this.lastLimit;
			
			if(this.last_offset < 0){
				return;
			}
			
			this.call("products", {
				limit: this.lastLimit,
				offset: this.lastOffset
			}, success, error);
		}
	};
	
	// Extend the object before returning
	$.extend(object, settings);
	
	// Return the object
	return object;
}