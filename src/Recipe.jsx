// Main.jsx from Scrimba
import React from "react";
import ClaudeRecipe from "./component/ClaudeRecipe";
import IngredientsList from "./component/IngredientsList";
import { getRecipeFromChefClaude } from "./ai";

export default function Recipe() {
    const [ingredients, setIngredients] = React.useState([]);


    function addIngredients(formData) {
        const new_ingredient = formData.get("ingredient");
        setIngredients(prevIngredient => [...prevIngredient, new_ingredient]);
    }

    const [recipe, setRecipe] = React.useState("");
    const recipeSection = React.useRef(null);

    React.useEffect(() => {
        if (recipe !== "" && recipeSection.current !== null) {
            recipeSection.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [recipe]);

    const [isLoading, setIsLoading] = React.useState(false);

    const fetchRecipe = async () => {
        try {
            setIsLoading(true);
            console.log('Starting to fetch recipe...'); // Debug log
            const recipeMarkdown = await getRecipeFromChefClaude(ingredients);
            setRecipe(recipeMarkdown);
        } catch (error) {
            console.error('Error fetching recipe:', error);
            // Add some error state to show to the user
            setRecipe('Sorry, there was an error getting your recipe.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main>
            <form action={addIngredients} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>
            {ingredients.length > 0 &&
                <IngredientsList
                    ref={recipeSection}
                    ingredients={ingredients}
                    fetchRecipe={fetchRecipe}
                    loading={isLoading}
                />}

            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>
    );
}