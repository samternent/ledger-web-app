<template>
  <div class="w-full flex-1 overflow-auto">
    <table class="table w-full">
      <!-- head -->
      <thead>
        <tr>
          <th class="sticky top-0 z-20">
            <label>
              <input type="checkbox" class="checkbox">
            </label>
          </th>
          
          <!-- LOOP DATA in TH -->
          <th class="sticky top-0 z-20 flex items-center">
            <div class="flex flex-col">
              <input placeholder="Name" class="input input-sm" />
            </div>
            <button class="btn btn-circle btn-sm btn-ghost btn-secondary ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </th>


          <th class="sticky top-0 z-10 text-right">
            <button class="btn btn-sm btn-primary">+</button>
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        <tr class="hover" v-for="i in Array(10)" :key="i">
          <th>
            <label>
              <input type="checkbox" class="checkbox">
            </label>
          </th>
          <!-- LOOP DATA in TD -->

          <td>
          </td>
          <th>
            <button class="btn btn-ghost btn-xs">details</button>
          </th>
        </tr>
      </tbody>
      <!-- foot -->
      <tfoot>
        <tr>
          <th class="sticky bottom-0 left-0"></th>
          <!-- LOOP DATA in TH -->
          <th class="sticky bottom-0 text-center">
          </th>
          <th class="sticky bottom-0 text-center">
          </th>
        </tr>
      </tfoot>
      
    </table>
  </div>
</template>