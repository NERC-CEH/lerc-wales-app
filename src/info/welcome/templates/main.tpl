<div>
  <div id="swaps-container">
    <div id="swaps">
      <div class="swap first">
        <div class="message">
          <h2><%= t("Welcome") %></h2>
          <p>
            <%= t("<b>iRecord</b> is a platform for management and sharing of your wildlife observations. Learn more by swiping left") %>.
          </p>
        </div>
      </div>
      <div class="swap second">
        <div class="message">
          <h2><%= t("Record") %></h2>
          <p>
            <%= t("Record all the wildlife you see. Over <b>100,000 taxa</b> to choose from") %>.
          </p>
        </div>
      </div>
      <div class="swap third">
        <div class="message">
          <h2><%= t("Accuracy") %></h2>
          <p>
           <%= t(" Benefit from your <b>GPS and rich mapping choices</b>, further automatic <b>data checks</b> and review by experts") %>.
          </p>
        </div>
      </div>
      <div class="swap fourth">
        <div class="message">
          <h2><%= t("Science") %></h2>
          <p>
            <%= t("Become a citizen scientist and contribute your sightings to <b>research and conservation</b>") %>.
          </p>
        </div>
      </div>
      <div class="swap fifth">
        <div class="message">
          <h2><%= t("Lets start!") %></h2>
          <p>
            <%= t("All that’s left to do is to click on the") %> <b style="white-space: nowrap;"><%= t("Get Started") %></b> <%= t("button below") %>.
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="progress">
    <div class="circle circle-full" data-id="0" />
    <div class="circle" data-id="1" />
    <div class="circle" data-id="2" />
    <div class="circle" data-id="3" />
    <div class="circle" data-id="4" />
  </div>
  <button id="exit" class="btn btn-block">
    <%= t("Get Started") %>
  </button>
</div>
