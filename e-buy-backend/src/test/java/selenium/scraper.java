package selenium;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class scraper {
    @Test
    public void checkChrome() throws InterruptedException {
        System.setProperty("webdriver.chrome.driver", "src/test/java/selenium/drivers/chromedriver.exe");
        WebDriver driver = new ChromeDriver();


        String url = "jdbc:mysql://localhost:3306/ebuy";
        String username = "root";
        String password = "root";

        try {
            // Connect to the existing database
            Connection conn = DriverManager.getConnection(url, username, password);

            // Open the Target webpage
            driver.get("https://www.target.com/c/cubbies-storage-cubes-organization-home/-/N-558lg");

            // Wait for the product elements to be present
            driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);

            // Find all elements for product names, prices, and images
            List<WebElement> nameElements = driver.findElements(By.xpath("//*[@id='pageBodyContainer']/div/div[1]/div/div[7]/div/div[1]/section/div/div[1]/div/div/div[1]/div[2]/div/div/div[1]/div[1]/div[1]/a"));
            List<WebElement> priceElements = driver.findElements(By.xpath("//*[@id='pageBodyContainer']/div/div[1]/div/div[7]/div/div[1]/section/div/div[2]/div/div/div[1]/div[1]/h3/div/div/a/div[1]/picture/img"));
            List<WebElement> imageElements = driver.findElements(By.xpath("//*[@id='pageBodyContainer']/div/div[1]/div/div[7]/div/div[1]/section/div/div[2]/div/div/div[1]/div[1]/h3/div/div/a/div[1]/picture/img"));

            // Limit the number of products to extract
            int maxProducts = Math.min(nameElements.size(), 15);

            // Prepare SQL statement for inserting data into the existing table
            String insertSQL = "INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)";
            PreparedStatement preparedStatement = conn.prepareStatement(insertSQL);

            // Extract data from each product and insert it into the database
            for (int i = 0; i < maxProducts; i++) {
                String name = nameElements.get(i).getText();
                String price = priceElements.get(i).getText();
                String description = ""; // Assuming description is not directly available, can be set as empty or scrape if available
                String imageUrl = imageElements.get(i).getAttribute("src");

                System.out.println("Name: " + name + ", Price: " + price + ", Description: " + description + ", Image URL: " + imageUrl);

                // Set parameters and execute the prepared statement
                preparedStatement.setString(1, name);
                preparedStatement.setString(2, price);
                preparedStatement.setString(3, description);
                preparedStatement.setString(4, imageUrl);
                preparedStatement.executeUpdate();
            }

            // Close the database connection
            conn.close();

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            // Close the WebDriver
            driver.quit();
        }
    }
}