<<<<<<< HEAD
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import random

# Initialize FastAPI app
app = FastAPI(title="Smart Farm Simulator API", version="1.0.0")

# Enable CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Define the simulation request model
class SimulationRequest(BaseModel):
    crop: str
    irrigation: str
    fertilizer: str
    farming_method: str
    land_area: float
    budget: float

# Crop yield multipliers (tons per acre)
crop_yields = {
    "wheat": {"base": 3.5, "range": 0.8},
    "rice": {"base": 4.2, "range": 1.0},
    "corn": {"base": 5.8, "range": 1.2},
    "cotton": {"base": 2.1, "range": 0.5},
    "soybean": {"base": 2.8, "range": 0.6},
    "tomato": {"base": 15.0, "range": 3.0}
}

# Irrigation efficiency multipliers
irrigation_multipliers = {
    "drip": 1.3,
    "sprinkler": 1.2,
    "flood": 1.0,
    "rainfed": 0.8
}

# Fertilizer cost and yield multipliers
fertilizer_data = {
    "organic": {"cost_multiplier": 1.2, "yield_multiplier": 0.95},
    "chemical": {"cost_multiplier": 0.8, "yield_multiplier": 1.1},
    "mixed": {"cost_multiplier": 1.0, "yield_multiplier": 1.05},
    "none": {"cost_multiplier": 0.3, "yield_multiplier": 0.7}
}

# Farming method multipliers
farming_multipliers = {
    "traditional": 0.8,
    "modern": 1.2,
    "organic": 0.9,
    "hydroponic": 1.4,
    "precision": 1.3
}

# Market prices (₹ per kg)
market_prices = {
    "wheat": 25,
    "rice": 35,
    "corn": 18,
    "cotton": 45,
    "soybean": 40,
    "tomato": 12
}

def calculate_simulation(request: SimulationRequest):
    """Calculate simulation results based on input parameters"""

    # Base yield calculation
    crop_data = crop_yields.get(request.crop, {"base": 3.0, "range": 0.5})
    base_yield = crop_data["base"] * request.land_area

    # Apply multipliers
    irrigation_mult = irrigation_multipliers.get(request.irrigation, 1.0)
    fertilizer_mult = fertilizer_data.get(request.fertilizer, {"yield_multiplier": 1.0})["yield_multiplier"]
    farming_mult = farming_multipliers.get(request.farming_method, 1.0)

    # Calculate final yield with some randomness
    final_yield = base_yield * irrigation_mult * fertilizer_mult * farming_mult
    yield_variation = random.uniform(-crop_data["range"], crop_data["range"])
    final_yield = max(0, final_yield + yield_variation)

    # Calculate costs
    base_cost_per_acre = 15000  # Base farming cost per acre
    irrigation_cost_mult = {"drip": 1.5, "sprinkler": 1.3, "flood": 1.0, "rainfed": 0.5}
    fertilizer_cost_mult = fertilizer_data.get(request.fertilizer, {"cost_multiplier": 1.0})["cost_multiplier"]

    total_cost = (base_cost_per_acre * request.land_area *
                 irrigation_cost_mult.get(request.irrigation, 1.0) *
                 fertilizer_cost_mult)

    # Ensure cost doesn't exceed budget
    total_cost = min(total_cost, request.budget * 0.9)

    # Calculate revenue
    price_per_kg = market_prices.get(request.crop, 20)
    revenue = final_yield * 1000 * price_per_kg  # Convert tons to kg

    # Calculate profit
    profit = revenue - total_cost

    # Determine risk level
    if profit > revenue * 0.3:
        risk = "Low"
    elif profit > 0:
        risk = "Medium"
    else:
        risk = "High"

    # Find best crop alternative (simple logic)
    best_crop = request.crop
    best_profit = profit

    for crop, data in crop_yields.items():
        if crop != request.crop:
            alt_yield = data["base"] * request.land_area * irrigation_mult * fertilizer_mult * farming_mult
            alt_revenue = alt_yield * 1000 * market_prices.get(crop, 20)
            alt_profit = alt_revenue - total_cost
            if alt_profit > best_profit:
                best_crop = crop
                best_profit = alt_profit

    # Format results for JSON response
    yield_kg = round(final_yield * 1000, 1)
    profit_value = round(profit, 0)
    revenue_value = round(revenue, 0)
    cost_value = round(total_cost, 0)
    market_price_value = round(price_per_kg, 0)
    yield_per_acre = round(final_yield / request.land_area if request.land_area > 0 else 0, 2)

    return {
        "yield": yield_kg,
        "cost": cost_value,
        "profit": profit_value,
        "risk": risk,
        "crop": request.crop.title(),
        "best_crop": best_crop.title() if best_crop != request.crop else request.crop.title(),
        "revenue": revenue_value,
        "efficiency": round(final_yield / (request.land_area * crop_data['base']) if request.land_area > 0 else 0, 2),
        "details": {
            "land_area": round(request.land_area, 1),
            "irrigation_type": request.irrigation.title(),
            "fertilizer_type": request.fertilizer.title(),
            "farming_method": request.farming_method.title(),
            "market_price": market_price_value,
            "yield_per_acre": yield_per_acre
        }
    }

# API Endpoint: GET /api/simulation (existing)
@app.get("/api/simulation")
async def get_simulation():
    """
    Returns default smart farm simulation data.
    """
    return {
        "yield": 1200,
        "cost": 3000,
        "profit": 7000,
        "risk": "Low",
        "crop": "Cotton"
    }

# API Endpoint: POST /api/simulation (new)
@app.post("/api/simulation")
async def run_simulation(request: SimulationRequest):
    """
    Runs a custom smart farm simulation based on input parameters.
    """
    try:
        result = calculate_simulation(request)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Simulation error: {str(e)}")

# Health check endpoint
@app.get("/health")
async def health_check():
    """
    Health check endpoint to verify the API is running.
    """
    return {"status": "healthy", "message": "Smart Farm Simulator API is running"}

# Root endpoint
@app.get("/")
async def root():
    """
    Root endpoint with API information.
    """
    return {
        "message": "Smart Farm Simulator API",
        "version": "1.0.0",
        "endpoints": {
            "GET /api/simulation": "Get default simulation data",
            "POST /api/simulation": "Run custom simulation with parameters",
            "GET /health": "Health check"
        }
    }
    return {
        "message": "Welcome to Smart Farm Simulator API",
        "version": "1.0.0",
        "endpoints": {
            "/api/simulation": "GET - Returns farm simulation data",
            "/health": "GET - Health check",
            "/docs": "Interactive API documentation (Swagger UI)"
        }
    }


if __name__ == "__main__":
    import uvicorn
    # Run the server on port 4000 by default for frontend integration
    uvicorn.run(app, host="0.0.0.0", port=4000)
=======
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import random

# Initialize FastAPI app
app = FastAPI(title="Smart Farm Simulator API", version="1.0.0")

# Enable CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Define the simulation request model
class SimulationRequest(BaseModel):
    crop: str
    irrigation: str
    fertilizer: str
    farming_method: str
    land_area: float
    budget: float

# Crop yield multipliers (tons per acre)
crop_yields = {
    "wheat": {"base": 3.5, "range": 0.8},
    "rice": {"base": 4.2, "range": 1.0},
    "corn": {"base": 5.8, "range": 1.2},
    "cotton": {"base": 2.1, "range": 0.5},
    "soybean": {"base": 2.8, "range": 0.6},
    "tomato": {"base": 15.0, "range": 3.0}
}

# Irrigation efficiency multipliers
irrigation_multipliers = {
    "drip": 1.3,
    "sprinkler": 1.2,
    "flood": 1.0,
    "rainfed": 0.8
}

# Fertilizer cost and yield multipliers
fertilizer_data = {
    "organic": {"cost_multiplier": 1.2, "yield_multiplier": 0.95},
    "chemical": {"cost_multiplier": 0.8, "yield_multiplier": 1.1},
    "mixed": {"cost_multiplier": 1.0, "yield_multiplier": 1.05},
    "none": {"cost_multiplier": 0.3, "yield_multiplier": 0.7}
}

# Farming method multipliers
farming_multipliers = {
    "traditional": 0.8,
    "modern": 1.2,
    "organic": 0.9,
    "hydroponic": 1.4,
    "precision": 1.3
}

# Market prices (₹ per kg)
market_prices = {
    "wheat": 25,
    "rice": 35,
    "corn": 18,
    "cotton": 45,
    "soybean": 40,
    "tomato": 12
}

def calculate_simulation(request: SimulationRequest):
    """Calculate simulation results based on input parameters"""

    # Base yield calculation
    crop_data = crop_yields.get(request.crop, {"base": 3.0, "range": 0.5})
    base_yield = crop_data["base"] * request.land_area

    # Apply multipliers
    irrigation_mult = irrigation_multipliers.get(request.irrigation, 1.0)
    fertilizer_mult = fertilizer_data.get(request.fertilizer, {"yield_multiplier": 1.0})["yield_multiplier"]
    farming_mult = farming_multipliers.get(request.farming_method, 1.0)

    # Calculate final yield with some randomness
    final_yield = base_yield * irrigation_mult * fertilizer_mult * farming_mult
    yield_variation = random.uniform(-crop_data["range"], crop_data["range"])
    final_yield = max(0, final_yield + yield_variation)

    # Calculate costs
    base_cost_per_acre = 15000  # Base farming cost per acre
    irrigation_cost_mult = {"drip": 1.5, "sprinkler": 1.3, "flood": 1.0, "rainfed": 0.5}
    fertilizer_cost_mult = fertilizer_data.get(request.fertilizer, {"cost_multiplier": 1.0})["cost_multiplier"]

    total_cost = (base_cost_per_acre * request.land_area *
                 irrigation_cost_mult.get(request.irrigation, 1.0) *
                 fertilizer_cost_mult)

    # Ensure cost doesn't exceed budget
    total_cost = min(total_cost, request.budget * 0.9)

    # Calculate revenue
    price_per_kg = market_prices.get(request.crop, 20)
    revenue = final_yield * 1000 * price_per_kg  # Convert tons to kg

    # Calculate profit
    profit = revenue - total_cost

    # Determine risk level
    if profit > revenue * 0.3:
        risk = "Low"
    elif profit > 0:
        risk = "Medium"
    else:
        risk = "High"

    # Find best crop alternative (simple logic)
    best_crop = request.crop
    best_profit = profit

    for crop, data in crop_yields.items():
        if crop != request.crop:
            alt_yield = data["base"] * request.land_area * irrigation_mult * fertilizer_mult * farming_mult
            alt_revenue = alt_yield * 1000 * market_prices.get(crop, 20)
            alt_profit = alt_revenue - total_cost
            if alt_profit > best_profit:
                best_crop = crop
                best_profit = alt_profit

    # Format results for JSON response
    yield_kg = round(final_yield * 1000, 1)
    profit_value = round(profit, 0)
    revenue_value = round(revenue, 0)
    cost_value = round(total_cost, 0)
    market_price_value = round(price_per_kg, 0)
    yield_per_acre = round(final_yield / request.land_area if request.land_area > 0 else 0, 2)

    return {
        "yield": yield_kg,
        "cost": cost_value,
        "profit": profit_value,
        "risk": risk,
        "crop": request.crop.title(),
        "best_crop": best_crop.title() if best_crop != request.crop else request.crop.title(),
        "revenue": revenue_value,
        "efficiency": round(final_yield / (request.land_area * crop_data['base']) if request.land_area > 0 else 0, 2),
        "details": {
            "land_area": round(request.land_area, 1),
            "irrigation_type": request.irrigation.title(),
            "fertilizer_type": request.fertilizer.title(),
            "farming_method": request.farming_method.title(),
            "market_price": market_price_value,
            "yield_per_acre": yield_per_acre
        }
    }

# API Endpoint: GET /api/simulation (existing)
@app.get("/api/simulation")
async def get_simulation():
    """
    Returns default smart farm simulation data.
    """
    return {
        "yield": 1200,
        "cost": 3000,
        "profit": 7000,
        "risk": "Low",
        "crop": "Cotton"
    }

# API Endpoint: POST /api/simulation (new)
@app.post("/api/simulation")
async def run_simulation(request: SimulationRequest):
    """
    Runs a custom smart farm simulation based on input parameters.
    """
    try:
        result = calculate_simulation(request)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Simulation error: {str(e)}")

# Health check endpoint
@app.get("/health")
async def health_check():
    """
    Health check endpoint to verify the API is running.
    """
    return {"status": "healthy", "message": "Smart Farm Simulator API is running"}

# Root endpoint
@app.get("/")
async def root():
    """
    Root endpoint with API information.
    """
    return {
        "message": "Smart Farm Simulator API",
        "version": "1.0.0",
        "endpoints": {
            "GET /api/simulation": "Get default simulation data",
            "POST /api/simulation": "Run custom simulation with parameters",
            "GET /health": "Health check"
        }
    }
    return {
        "message": "Welcome to Smart Farm Simulator API",
        "version": "1.0.0",
        "endpoints": {
            "/api/simulation": "GET - Returns farm simulation data",
            "/health": "GET - Health check",
            "/docs": "Interactive API documentation (Swagger UI)"
        }
    }


if __name__ == "__main__":
    import uvicorn
    # Run the server on port 4000 by default for frontend integration
    uvicorn.run(app, host="0.0.0.0", port=4000)
>>>>>>> 7daba2bddea150de277043110e497a4d2e828425
