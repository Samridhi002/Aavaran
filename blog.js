document.addEventListener("DOMContentLoaded", function() {
    const blogsContainer = document.getElementById('blogs-container');
    const blogList = document.getElementById('blog-list');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeModal = document.querySelector('.close');

    const blogs = [
        {
            title: "The Importance of Sustainability",
            description: "Sustainability is crucial for the future of our planet. This blog explores why it's important and how you can contribute to making a positive impact.",
            link: "#"
        },
        {
            title: "10 Simple Ways to Reduce Your Carbon Footprint",
            description: "Reducing your carbon footprint is essential in the fight against climate change. Discover 10 simple and effective ways to lower your carbon emissions.",
            link: "#"
        },
        {
            title: "Understanding Renewable Energy Sources",
            description: "Renewable energy sources play a significant role in sustainable development. Learn about different types of renewable energy and their benefits.",
            link: "#"
        },
        {
            title: "Sustainable Living: A Guide for Beginners",
            description: "This guide provides practical tips for those new to sustainable living. Start making eco-friendly choices today and contribute to a greener future.",
            link: "#"
        },
        {
            title: "The Impact of Plastic Pollution",
            description: "Plastic pollution is a major environmental issue. This blog discusses the impacts of plastic pollution and how we can work towards reducing plastic waste.",
            link: "#"
        },
        {
            title: "Eco-Friendly Alternatives to Everyday Products",
            description: "Explore eco-friendly alternatives to common everyday products. Making these changes can significantly reduce your environmental footprint.",
            link: "#"
        },
        {
            title: "The Benefits of Eating a Plant-Based Diet",
            description: "A plant-based diet has numerous health and environmental benefits. Learn how adopting this diet can contribute to personal and planetary well-being.",
            link: "#"
        },
        {
            title: "How to Start a Community Garden",
            description: "Starting a community garden can have positive effects on your local environment and community. This blog provides a step-by-step guide to getting started.",
            link: "#"
        },
        {
            title: "The Role of Technology in Sustainability",
            description: "Technology is a powerful tool for promoting sustainability. Discover how innovative technologies are helping to address environmental challenges.",
            link: "#"
        },
        {
            title: "Sustainable Fashion: What You Need to Know",
            description: "Sustainable fashion is changing the industry. Learn about the principles of sustainable fashion and how to make more responsible fashion choices.",
            link: "#"
        },
        {
            title: "Renewable Energy for Home Use",
            description: "Incorporating renewable energy solutions in your home can reduce your energy bills and environmental impact. Explore different options for home renewable energy.",
            link: "#"
        },
        {
            title: "Reducing Waste: Tips and Strategies",
            description: "Effective waste reduction strategies can minimize your environmental impact. This blog offers practical tips for reducing waste in your daily life.",
            link: "#"
        }
    ];

    blogs.forEach((blog, index) => {
        const blogDiv = document.createElement('div');
        blogDiv.classList.add('blog');
        
        const titleDiv = document.createElement('div');
        titleDiv.classList.add('title');
        titleDiv.textContent = blog.title;

        const linkDiv = document.createElement('div');
        linkDiv.classList.add('link');
        const link = document.createElement('a');
        link.href = "#";
        link.textContent = "Read more";
        link.addEventListener('click', (event) => {
            event.preventDefault();
            modalTitle.textContent = blog.title;
            modalDescription.textContent = blog.description;
            modal.style.display = "block";
        });
        linkDiv.appendChild(link);

        blogDiv.appendChild(titleDiv);
        blogDiv.appendChild(linkDiv);
        blogsContainer.appendChild(blogDiv);

        // Populate sidebar
        const sidebarItem = document.createElement('li');
        const sidebarLink = document.createElement('a');
        sidebarLink.href = `#${index}`;
        sidebarLink.textContent = blog.title;
        sidebarItem.appendChild(sidebarLink);
        blogList.appendChild(sidebarItem);
    });

    // Close modal when clicking the close button
    closeModal.addEventListener('click', () => {
        modal.style.display = "none";
    });

    // Close modal when clicking outside of the modal
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
