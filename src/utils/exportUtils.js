// Export utilities for CSV and PDF formats

export const exportToCSV = (data, filename = 'export') => {
  if (!data || data.length === 0) {
    console.warn('No data to export');
    return;
  }

  // Get headers from the first object
  const headers = Object.keys(data[0]);
  
  // Create CSV content
  const csvContent = [
    // Header row
    headers.join(','),
    // Data rows
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Handle values that might contain commas or quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToPDF = async (data, filename = 'export', title = 'Export Report') => {
  try {
    // For PDF export, we'll create a simple HTML table and convert it
    // In a real application, you might want to use libraries like jsPDF or Puppeteer
    
    if (!data || data.length === 0) {
      console.warn('No data to export');
      return;
    }

    const headers = Object.keys(data[0]);
    
    // Create HTML content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 20px;
              color: #333;
            }
            h1 { 
              color: #2563EB; 
              border-bottom: 2px solid #2563EB;
              padding-bottom: 10px;
            }
            table { 
              width: 100%; 
              border-collapse: collapse; 
              margin-top: 20px;
            }
            th, td { 
              border: 1px solid #ddd; 
              padding: 12px; 
              text-align: left; 
            }
            th { 
              background-color: #f8f9fa; 
              font-weight: bold;
              color: #495057;
            }
            tr:nth-child(even) { 
              background-color: #f8f9fa; 
            }
            .export-info {
              margin-bottom: 20px;
              padding: 10px;
              background-color: #e3f2fd;
              border-left: 4px solid #2563EB;
            }
            @media print {
              body { margin: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <h1>${title}</h1>
          <div class="export-info">
            <strong>Generated:</strong> ${new Date().toLocaleString()}<br>
            <strong>Records:</strong> ${data.length}
          </div>
          <table>
            <thead>
              <tr>
                ${headers.map(header => `<th>${header.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${data.map(row => `
                <tr>
                  ${headers.map(header => `<td>${row[header] || ''}</td>`).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    // Create a new window and print
    const printWindow = window.open('', '_blank');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load then trigger print dialog
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        // Close window after printing (optional)
        printWindow.onafterprint = () => {
          printWindow.close();
        };
      }, 250);
    };

  } catch (error) {
    console.error('Error exporting to PDF:', error);
    alert('Error generating PDF. Please try again.');
  }
};

export const exportToJSON = (data, filename = 'export') => {
  if (!data || data.length === 0) {
    console.warn('No data to export');
    return;
  }

  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.json`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Export component data based on component type
export const getExportData = (componentType, data) => {
  switch (componentType) {
    case 'crm-leads':
      return data.map(lead => ({
        Name: lead.name,
        Company: lead.company,
        Email: lead.email,
        Phone: lead.phone,
        Status: lead.status,
        Value: lead.value,
        Source: lead.source,
        'Last Contact': lead.lastContact,
        'Assigned To': lead.assignedTo
      }));
    
    case 'crm-customers':
      return data.map(customer => ({
        Name: customer.name,
        Company: customer.company,
        Email: customer.email,
        Phone: customer.phone,
        'Total Value': customer.totalValue,
        'Join Date': customer.joinDate,
        'Last Order': customer.lastOrder,
        Status: customer.status
      }));
    
    case 'crm-deals':
      return data.map(deal => ({
        Title: deal.title,
        Company: deal.company,
        Value: deal.value,
        Stage: deal.stage,
        'Probability (%)': deal.probability,
        'Close Date': deal.closeDate,
        Owner: deal.owner
      }));
    
    case 'financial-transactions':
      return data.map(transaction => ({
        Date: transaction.date,
        Description: transaction.description,
        Category: transaction.category,
        Amount: transaction.amount,
        Type: transaction.type,
        Status: transaction.status
      }));
    
    case 'financial-invoices':
      return data.map(invoice => ({
        'Invoice ID': invoice.id,
        Client: invoice.client,
        Amount: invoice.amount,
        'Due Date': invoice.dueDate,
        Status: invoice.status,
        'Issue Date': invoice.issueDate
      }));
    
    case 'security-logs':
      return data.map(log => ({
        Timestamp: log.timestamp,
        User: log.user,
        Action: log.action,
        Resource: log.resource,
        'IP Address': log.ip,
        Status: log.status,
        Location: log.location
      }));
    
    case 'security-users':
      return data.map(user => ({
        Name: user.name,
        Email: user.email,
        Role: user.role,
        Status: user.status,
        'Last Login': user.lastLogin,
        'MFA Enabled': user.mfaEnabled ? 'Yes' : 'No'
      }));
    
    default:
      return data;
  }
};