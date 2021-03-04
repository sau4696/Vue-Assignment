<template>
  <div>
    <h1>Datatable</h1>
    <div class="row mb-5">
      <div class="col-12 text-right">
        <button class="btn btn-primary mr-3" v-on:click="GenerateData(1000)">
          Randomize Data
        </button>
      </div>
    </div>
    <div v-if="dataset.length > 0">
      <!-- <DataTable
      :headerFields="headerFields"
      :css="datatableCss"
      :sort-field="sortField"
      :sort="sort"
      :data="dataset || []"
      :is-loading="isLoading"
      
      not-found-msg="Items not found"
      
      trackBy="JobTitle"
    >
    </DataTable> -->
      <div class="row">
        <div class="col-4">
          <div class="filter-div">
            <!-- <span data-gjs-type="mySpan" class="filter-label">Country</span> -->
            <v-select
              :options="countries"
              label="name"
              v-model="filterObj.Country"
              id="i426g"
              placeholder="-- Country --"
              class="filter-select mr-4"
            >
            </v-select>
          </div>
        </div>
        <div class="col-4">
          <!-- <span data-gjs-type="mySpan" class="filter-label">JobTitle</span> -->
          <v-select
            :options="jobs"
            v-model="filterObj.JobTitle"
            placeholder="-- Job --"
            id="i426g-2"
            class="filter-select mr-4"
          ></v-select>
        </div>

        <div class="col-4">
          <transition name="search">
            <div
              :class="{ 'show fade-in': showSearchBox }"
              class="header-search-holder"
            >
              <input
                data-gjs-type="myInput"
                type="text"
                ref="activitySearch"
                v-model.trim="searchText"
                placeholder="Search here"
                autofocus
                class="form-control"
              />
            </div>
          </transition>
        </div>
      </div>

      <div class="col-12 table-design">
        <!-- <h1 data-gjs-type="myHeading">Todo List</h1> -->
        <table class="table table-striped mt-5">
          <thead>
            <tr>
              <th scope="col" id="im3r">ID</th>
              <th scope="col" id="im3r-2">Job Title</th>
              <th scope="col" id="ixx8">Fullname</th>
              <th scope="col" id="i7hf">Country</th>
              <th scope="col" id="i7hf-2">
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  v-model="Q1Flag"
                  value="q1"
                />SalaryinQ1
              </th>
              <th scope="col" id="i7hf-2">
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="q2"
                  v-model="Q2Flag"
                />SalaryinQ2
              </th>
              <th scope="col" id="i7hf-2">
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="q3"
                  v-model="Q3Flag"
                />SalaryinQ3
              </th>
              <th scope="col" id="i7hf-2">
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="q4"
                  v-model="Q4Flag"
                />SalaryinQ4
              </th>
              <th scope="col" id="i7hf-2">Total Salary</th>
              <th scope="col" id="i7hf-2">Total Salary(in hours)</th>
              <th scope="col" id="i3zjn">Action</th>
            </tr>
          </thead>
          <tbody id="i654k">
            <tr v-for="(emp, index) in allDatasets" :key="index" id="iezgc">
              <td scope="row">
                {{ emp.ID }}
              </td>
              <td scope="row">
                {{ emp.JobTitle }}
              </td>
              <td id="iftoz">{{ emp.FirstName + emp.LastName }}</td>
              <td id="idpr3">{{ emp.Country }}</td>
              <td scope="col" id="i1dwj">
                {{ emp.SalaryinQ1 }}
              </td>

              <td scope="col" id="i1dwj">
                {{ emp.SalaryinQ2 }}
              </td>
              <td scope="col" id="i1dwj">
                {{ emp.SalaryinQ3 }}
              </td>
              <td scope="col" id="i1dwj">
                {{ emp.SalaryinQ4 }}
              </td>
              <td scope="col" id="i1dwj">{{ getSalary(emp) }}</td>
              <td scope="col" id="i1dwj">{{ getWorkingHours(emp) }}</td>
              <td scope="col" id="i1dwj-2">
                <button
                  class="btn btn-primary mb-2 mr-2"
                  data-gjs-type="myButton"
                  v-on:click="modalOperation(emp, 'show')"
                >
                  View
                </button>
                <!-- <button
                  class="btn btn-success mb-2"
                  data-gjs-type="myButton"
                  v-on:click="editmodalOperation(emp, 'show')"
                >
                 Edit
                </button> -->
                <button
                  class="btn btn-danger mb-2"
                  data-gjs-type="myButton"
                  v-on:click="deleteRecord(emp.ID)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="card-footer pb-0 pt-3">
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item">
                <button
                  type="button"
                  class="page-link"
                  v-if="page != 1"
                  @click="page--"
                >
                  Previous
                </button>
              </li>
              <li class="page-item">
                <button
                  type="button"
                  class="page-link"
                  v-for="(pageNumber, index) in pages.slice(page - 1, page + 5)"
                  :key="index"
                  @click="page = pageNumber"
                >
                  {{ pageNumber }}
                </button>
              </li>
              <li class="page-item">
                <button
                  type="button"
                  @click="page++"
                  v-if="page < pages.length"
                  class="page-link"
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    <b-modal
      ref="viewmodal"
      id="viewmodal-5-7"
      centered=""
      title="BootstrapVue"
      hide-footer=""
      hide-header=""
    >
      <div data-v-e8a1ec22="" class="heading">
        <h4 data-gjs-type="myHeading" data-v-e8a1ec22="" class="title mb-3">
          <strong>Employee Details</strong>
        </h4>
        <hr />
        <span data-gjs-type="mySpan" data-v-e8a1ec22="" class="details"
          ><p><strong>Employee ID:</strong>{{ currentObject.ID }}</p></span
        >
        <span data-gjs-type="mySpan" data-v-e8a1ec22="" class="details"
          ><p>
            <strong>Employee Job Title:</strong>{{ currentObject.JobTitle }}
          </p></span
        >
        <span data-gjs-type="mySpan" data-v-e8a1ec22="" class="details"
          ><p>
            <strong> Employee FullName:</strong
            >{{ currentObject.FirstName + currentObject.LastName }}
          </p></span
        >
        <span data-gjs-type="mySpan" data-v-e8a1ec22="" class="details"
          ><p><strong>Country:</strong>{{ currentObject.Country }}</p></span
        >
      </div>
      <div id="chart">
        <apexchart
          type="line"
          height="350"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
      <div class="action-btn text-center mt-2">
        <button
          class="btn btn-success mr-3"
          data-gjs-type="myButton"
          v-on:click="modalOperation({}, 'hide')"
        >
          Ok
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
//import { DataTable} from "v-datatable-light";
import vSelect from "vue-select";
import VueApexCharts from "vue-apexcharts";
//import JwPagination from 'jw-vue-pagination';

export default {
  components: {
    vSelect,
    apexchart: VueApexCharts,
  },
  mounted() {},
  data() {
    return {
      pageOfItems: [],
      filterApplied: false,
      showSearchBox: false,
      showFilterBox: true,
      filterObj: {
        country: null,
        jobtitle: null,
      },

      employeeObject: {
        ID: 0, // Unique Field
        JobTitle: "", // Set it from any type of job list
        EmailAddress: "", // firstname_lastname@xycom
        FirstName: "",
        LastName: "", // Any two words of random string
        Country: "",
        SalaryinQ1: 0,
        SalaryinQ2: 0,
        SalaryinQ3: 0,
        SalaryinQ4: 0,
        WorkingHoursinQ1: 0,
        WorkingHoursinQ2: 0,
        WorkingHoursinQ3: 0,
        WorkingHoursinQ4: 0,
      },
      dataset: [],
      jobs: [
        "ProgramAssociate",
        "Project Trainee",
        "Senior Software Engineer",
        "Junior Engineer",
        "System Engineer",
        "Data Engineer",
        "UI developer",
        "Senior HR",
      ],
      countries: [
        "Albania",
        "Algeria",
        "American Samoa",
        "Bhutan",
        "Botswana",
        "Brazil",
        "Bulgaria",
        "Canada",
        "Italy",
        "India",
      ],

      currentObject: {},
      isLoading: false,
      sort: "asc",
      sortField: "ID",
      Q1Flag: false,
      Q2Flag: false,
      Q3Flag: false,
      Q4Flag: false,
      salary: 0.0,
      searchText: "",
      page: 1,
      perPage: 9,
      pages: [],
      resultFound: true,
      series: [
        {
          name: "Salary",
          type: "column",
          data: [],
        },
        {
          name: "Hours",
          type: "column",
          data: [],
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "line",
          stacked: false,
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: [1, 1, 4],
        },
        title: {
          text: "Employee Details",
          align: "left",
          offsetX: 110,
        },
        xaxis: {
          categories: ["Quarter1", "Quarter2", "Quarter3", "Quarter4"],
          //categories: [2009,2010]
        },
        yaxis: [
          {
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: "#008FFB",
            },
            labels: {
              style: {
                colors: "#008FFB",
              },
            },
            title: {
              text: "Salary (thousands )",
              style: {
                color: "#008FFB",
              },
            },
            tooltip: {
              enabled: true,
            },
          },
          {
            seriesName: "Hours",
            opposite: true,
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: "#00E396",
            },
            labels: {
              style: {
                colors: "#00E396",
              },
            },
            title: {
              text: "Working Hours",
              style: {
                color: "#00E396",
              },
            },
          },
        ],
        tooltip: {
          fixed: {
            enabled: false,
            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
            offsetY: 30,
            offsetX: 60,
          },
        },
        // legend: {
        //   horizontalAlign: "left",
        //   offsetX: 40,
        // },
      },
    };
  },
  methods: {
    getSalary(emp) {
      let salary = 0;
      if (this.Q1Flag == true) {
        salary += emp.SalaryinQ1;
      }
      if (this.Q2Flag == true) {
        salary += emp.SalaryinQ2;
      }
      if (this.Q3Flag == true) {
        salary += emp.SalaryinQ3;
      }
      if (this.Q4Flag == true) {
        salary += emp.SalaryinQ4;
      }

      return salary;
    },
    getWorkingHours(emp) {
      let hours = 0;
      if (this.Q1Flag == true) {
        hours += emp.WorkingHoursinQ1;
      }
      if (this.Q2Flag == true) {
        hours += emp.WorkingHoursinQ1;
      }
      if (this.Q3Flag == true) {
        hours += emp.WorkingHoursinQ1;
      }
      if (this.Q4Flag == true) {
        hours += emp.WorkingHoursinQ1;
      }

      return hours;
    },
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    },

    setPages() {
      let numberOfPages = Math.ceil(this.posts.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(posts) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return posts.slice(from, to);
    },
    insert(arr, ...items) {
      arr.push(...items);
    },

    modalOperation(emp, operation) {
      if (operation === "hide") {
        this.$refs["viewmodal"].hide();
        //this.currentObject ={}
        //this.series = [{}]
      }
      if (operation === "show") {
        this.$refs["viewmodal"].show();
      }
      this.currentObject = emp;
      let seriesData = this.series
     
      seriesData.forEach((ele) => {
        if ((ele.name = "Salary")) {
          this.insert(ele.data,
            this.currentObject.SalaryinQ1,
            this.currentObject.SalaryinQ2,
            this.currentObject.SalaryinQ3,
            this.currentObject.SalaryinQ4
          );
        }
         if ((ele.name = "Hours")) {
          this.insert(ele.data,
            this.currentObject.SalaryinQ1,
            this.currentObject.SalaryinQ2,
            this.currentObject.SalaryinQ3,
            this.currentObject.SalaryinQ4
          );
        }
        
      });
     
    },
   
    deleteRecord(id) {
      this.dataset.forEach((element, index) => {
        if (element.ID == id) {
          this.dataset.splice(index, 1);
        }
      });
    },
    GenerateData() {
      for (var i = 0; i < 100; i++) {
        this.employeeObject.ID = this.randomInt(1000);
        this.employeeObject.JobTitle = this.randomJobTitle();
        this.employeeObject.FirstName = this.randomString(
          this.randomInt(4) + 4
        );
        this.employeeObject.LastName = this.randomString(this.randomInt(4) + 4);
        this.employeeObject.EmailAddress =
          this.employeeObject.FirstName +
          "_" +
          this.employeeObject.LastName +
          "@" +
          this.randomString(this.randomInt(4) + 5) +
          ".com";
        this.employeeObject.Country = this.randomCountry();
        this.employeeObject.SalaryinQ1 = this.randomInt(99999);
        this.employeeObject.SalaryinQ2 = this.randomInt(99999);
        this.employeeObject.SalaryinQ3 = this.randomInt(99999);
        this.employeeObject.SalaryinQ4 = this.randomInt(99999);
        this.employeeObject.WorkingHoursinQ1 = this.randomInt(999);
        this.employeeObject.WorkingHoursinQ2 = this.randomInt(999);
        this.employeeObject.WorkingHoursinQ3 = this.randomInt(999);
        this.employeeObject.WorkingHoursinQ4 = this.randomInt(999);

        this.dataset.push(this.employeeObject);
        this.employeeObject = {};
      }
    },
    randomInt(rightBound) {
      return Math.floor(Math.random() * rightBound);
    },
    randomJobTitle() {
      const random = Math.floor(Math.random() * this.jobs.length);

      return this.jobs[random];
    },
    randomCountry() {
      const random = Math.floor(Math.random() * this.countries.length);

      return this.countries[random];
    },

    randomString(size) {
      var alphaChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      var generatedString = "";
      for (var i = 0; i < size; i++) {
        generatedString += alphaChars[this.randomInt(alphaChars.length)];
      }

      return generatedString;
    },
  },
  computed: {
    allDatasets() {
      let datasets = [...this.dataset];
      if (!datasets.length) {
        return datasets;
      }

      if (this.searchText === "") {
        datasets = [...this.dataset];

        if (this.filterObj.Country) {
          datasets = datasets.filter(
            (a) => a.Country == this.filterObj.Country
          );
        }

        if (this.filterObj.JobTitle) {
          datasets = datasets.filter(
            (a) => a.JobTitle == this.filterObj.JobTitle
          );
        }

        this.resultFound = true;
        return datasets;
      } else {
        let searchedReq = datasets.filter((a) =>
          a.FirstName.toLowerCase().includes(this.searchText.toLowerCase())
        );
        this.resultFound = searchedReq.length ? true : false;
        datasets = searchedReq;
      }

      return datasets;
    },
  },
};
</script>

<style>
.form-control {
  width: 363px;
  height: 37px;
}
.form-design {
  margin: 80px 0;
}
.table-design {
  background-color: white;
}
.form-group.builtin-wrapper {
  width: 369px;
}
.row.justify-content-center.min-vh-100.align-items-center {
  height: 483px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#app .title {
  margin-bottom: 30px;
}

#app .items-per-page {
  height: 100%;
  display: flex;
  align-items: center;
  color: #337ab7;
}

#app .items-per-page label {
  margin: 0 15px;
}

/* Datatable CSS */
#v-datatable-light .header-item {
  cursor: pointer;
  color: #337ab7;
  transition: color 0.15s ease-in-out;
}

#v-datatable-light .header-item:hover {
  color: #ed9b19;
}

#v-datatable-light .header-item.no-sortable {
  cursor: default;
}
#v-datatable-light .header-item.no-sortable:hover {
  color: #337ab7;
}

#v-datatable-light .header-item .th-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  font-weight: bold;
}

#v-datatable-light .header-item .th-wrapper.checkboxes {
  justify-content: center;
}

#v-datatable-light .header-item .th-wrapper .arrows-wrapper {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  justify-content: space-between;
}

#v-datatable-light .header-item .th-wrapper .arrows-wrapper.centralized {
  justify-content: center;
}

#v-datatable-light .arrow {
  transition: color 0.15s ease-in-out;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
}

#v-datatable-light .arrow.up {
  border-bottom: 8px solid #337ab7;
}

#v-datatable-light .arrow.up:hover {
  border-bottom: 8px solid #ed9b19;
}

#v-datatable-light .arrow.down {
  border-top: 8px solid #337ab7;
}

#v-datatable-light .arrow.down:hover {
  border-top: 8px solid #ed9b19;
}

#v-datatable-light .footer {
  display: flex;
  justify-content: space-between;
  width: 500px;
}
/* End Datatable CSS */

/* Pagination CSS */
#v-datatable-light-pagination {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0;
  padding: 0;
  width: 300px;
  height: 30px;
}

#v-datatable-light-pagination .pagination-item {
  width: 30px;
  margin-right: 5px;
  font-size: 16px;
  transition: color 0.15s ease-in-out;
}

#v-datatable-light-pagination .pagination-item.selected {
  color: #ed9b19;
}

#v-datatable-light-pagination .pagination-item .page-btn {
  background-color: transparent;
  outline: none;
  border: none;
  color: #337ab7;
  transition: color 0.15s ease-in-out;
}

#v-datatable-light-pagination .pagination-item .page-btn:hover {
  color: #ed9b19;
}

#v-datatable-light-pagination .pagination-item .page-btn:disabled {
  cursor: not-allowed;
  box-shadow: none;
  opacity: 0.65;
}
/* END PAGINATION CSS */

/* ITEMS PER PAGE DROPDOWN CSS */
.item-per-page-dropdown {
  background-color: transparent;
  min-height: 30px;
  border: 1px solid #337ab7;
  border-radius: 5px;
  color: #337ab7;
}
.item-per-page-dropdown:hover {
  cursor: pointer;
}
</style>